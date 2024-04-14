import React from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';
import Image from 'next/image';

const MeetingModal = ({ isOpen, onClose, title, className, children, buttonText, image, handleClick, buttonIcon }) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='flex w-full max-w-[520px] flex-col border-none bg-black px-6 py-9 text-white'>
          <div className='flex flex-col gap-6'>
            {image && (
              <div className='flex justify-center'>
                <Image src={image} alt='image' width={72} height={72}/>
              </div>
            )}
            <h1 className={cn('text-xl font-bold leading-[42px]', className)}>{title}</h1>
            {children}
            <Button className='bg-blue-500' onClick={handleClick}>
              {buttonIcon && (
                <Image src={buttonIcon} alt='button Icon' width={13} height={13}/>
              )}
              {buttonText || 'Schedule Meeting'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MeetingModal;
