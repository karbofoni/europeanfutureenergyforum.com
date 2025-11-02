/**
 * Simple in-memory rate limiter for API endpoints
 * For production, consider using Redis or a service like Upstash Rate Limit
 */

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max number of unique IPs to track
}

interface RateLimitData {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private config: RateLimitConfig;
  private requests: Map<string, RateLimitData>;

  constructor(config: RateLimitConfig) {
    this.config = config;
    this.requests = new Map();

    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private cleanup() {
    const now = Date.now();
    const entries = Array.from(this.requests.entries());
    for (const [key, data] of entries) {
      if (now > data.resetTime) {
        this.requests.delete(key);
      }
    }

    // If we have too many entries, remove oldest ones
    if (this.requests.size > this.config.uniqueTokenPerInterval) {
      const keysToDelete = Array.from(this.requests.keys()).slice(
        0,
        this.requests.size - this.config.uniqueTokenPerInterval
      );
      keysToDelete.forEach((key) => this.requests.delete(key));
    }
  }

  check(identifier: string, limit: number): { success: boolean; remaining: number; reset: number } {
    const now = Date.now();
    const data = this.requests.get(identifier);

    if (!data || now > data.resetTime) {
      // New window
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.config.interval,
      });
      return {
        success: true,
        remaining: limit - 1,
        reset: now + this.config.interval,
      };
    }

    if (data.count >= limit) {
      // Rate limit exceeded
      return {
        success: false,
        remaining: 0,
        reset: data.resetTime,
      };
    }

    // Increment count
    data.count++;
    return {
      success: true,
      remaining: limit - data.count,
      reset: data.resetTime,
    };
  }
}

// Create rate limiters for different use cases
export const aiRateLimiter = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Track up to 500 unique IPs
});

/**
 * Rate limit middleware for AI endpoints
 * @param identifier - Usually the IP address or user ID
 * @param limit - Number of requests allowed per interval (default: 10 per minute)
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 10
): { success: boolean; headers: Record<string, string> } {
  const result = aiRateLimiter.check(identifier, limit);

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };

  if (!result.success) {
    headers['Retry-After'] = Math.ceil((result.reset - Date.now()) / 1000).toString();
  }

  return {
    success: result.success,
    headers,
  };
}

/**
 * Get client identifier from request
 * Uses IP address or falls back to a default identifier
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (accounting for proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

  const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';

  return ip;
}
