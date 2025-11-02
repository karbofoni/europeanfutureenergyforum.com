'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Keyboard } from 'lucide-react';

const shortcuts = [
  { keys: ['?'], description: 'Show keyboard shortcuts' },
  { keys: ['g', 'h'], description: 'Go to Home' },
  { keys: ['g', 'p'], description: 'Go to Projects' },
  { keys: ['g', 'i'], description: 'Go to Investors' },
  { keys: ['g', 's'], description: 'Go to Suppliers' },
  { keys: ['g', 'g'], description: 'Go to Grid Guide' },
  { keys: ['Esc'], description: 'Close modals/dialogs' },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const [sequenceBuffer, setSequenceBuffer] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      const key = e.key;

      // Handle escape key
      if (key === 'Escape') {
        setOpen(false);
        return;
      }

      // Handle '?' to show help
      if (key === '?' && !e.shiftKey) {
        e.preventDefault();
        setOpen(true);
        setSequenceBuffer([]);
        return;
      }

      // Handle 'g' sequences
      if (key === 'g' || sequenceBuffer[0] === 'g') {
        e.preventDefault();
        const newBuffer = [...sequenceBuffer, key];
        setSequenceBuffer(newBuffer);

        // Clear buffer after 1 second
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setSequenceBuffer([]), 1000);

        // Check for complete sequences
        if (newBuffer.length === 2) {
          const sequence = newBuffer.join('');
          switch (sequence) {
            case 'gh':
              router.push('/');
              break;
            case 'gp':
              router.push('/projects');
              break;
            case 'gi':
              router.push('/investors');
              break;
            case 'gs':
              router.push('/suppliers');
              break;
            case 'gg':
              router.push('/grid');
              break;
          }
          setSequenceBuffer([]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [router, sequenceBuffer]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Navigate faster with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-200 rounded">Esc</kbd> to close this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
