import { X, User } from 'lucide-react';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  image: string;
  userImg: string | undefined;
  user: string;
  onClose: () => void;
}

export function Modal({ isOpen, image, userImg, user, onClose }: ModalProps) {
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

        <div className="flex w-full overflow-hidden bg-black/5 md:w-3/5">
          <img
            className="h-full w-full object-contain"
            src={image}
            alt={`Image by ${user}`}
          />
        </div>

        <div className="flex w-full flex-col justify-between bg-surface p-6 md:w-2/5 md:border-l md:border-border">
          <div className="flex flex-1 flex-col items-center justify-center py-4">
            <div className="relative group">
              {hasImage ? (
                <img
                  key={userImg}
                  className="size-24 rounded-full border-4 border-brand object-cover shadow-lg md:size-32 transition-transform duration-300 group-hover:scale-105"
                  src={userImg}
                  alt={user}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-full border-4 border-brand bg-brand/10 text-brand shadow-lg md:size-32">
                  <User className="size-12 md:size-16" strokeWidth={1.5} />
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full bg-brand text-white shadow-md">
                <User className="size-5" />
              </div>
            </div>
            
            <h4 className="mt-6 font-sans text-2xl font-bold text-text md:text-3xl text-balance text-center leading-tight">
              {user}
            </h4>
            <p className="mt-1 text-sm font-medium text-muted uppercase tracking-widest">Artist</p>

            <div className="mt-8 h-px w-12 bg-border" />
          </div>

          <div className="mt-auto pt-6 text-center">
             <button 
               onClick={onClose}
               className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-hover hover:shadow-lg active:scale-[0.98] md:hidden"
             >
               Close Preview
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
