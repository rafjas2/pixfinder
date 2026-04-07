import { X, User } from 'lucide-react';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  image: string;
  tags: string;
  userImg: string | undefined;
  user: string;
  onClose: () => void;
}

export function Modal({ isOpen, image, tags, userImg, user, onClose }: ModalProps) {
  const [imgError, setImgError] = useState(false);

  if (!isOpen) {
    return null;
  }

  const hasImage = userImg && !imgError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity animate-in fade-in duration-200">
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card md:flex-row md:h-[75vh]">
        
        <button
          onClick={onClose}
          className="group absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/80 text-text shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/5 hover:text-text hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="Close modal"
        >
          <X className="size-6 transition-transform duration-200 group-hover:rotate-90" />
        </button>

        <div className="flex w-full items-center justify-center bg-black/5 md:w-3/5">
          <img
            className="max-h-[60vh] w-full object-contain md:max-h-full md:h-full"
            src={image}
            alt={tags}
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center bg-surface p-6 md:w-2/5 md:border-l md:border-border">
          {hasImage ? (
            <img
              key={userImg}
              className="size-24 rounded-full border-4 border-brand object-cover shadow-sm md:size-32 bg-white"
              src={userImg}
              alt={user}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex size-24 items-center justify-center rounded-full border-4 border-brand bg-brand/10 text-brand shadow-sm md:size-32">
              <User className="size-12 md:size-16" strokeWidth={1.5} />
            </div>
          )}
          
          <h4 className="mt-4 font-sans text-xl font-medium text-text md:text-2xl text-balance text-center">
            By: {user}
          </h4>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {tags.split(',').map((tag) => (
              <span key={tag.trim()} className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
