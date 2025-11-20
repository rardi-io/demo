import { motion } from 'motion/react';

interface UserMessageProps {
  message: string;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end"
    >
      <div className="max-w-[80%] rounded-lg bg-primary px-4 py-3 text-primary-foreground">
        <p className="text-sm">{message}</p>
      </div>
    </motion.div>
  );
}
