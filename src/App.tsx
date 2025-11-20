import { ChatInterface } from './components/ChatInterface';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="w-screen h-screen bg-background">
      <ChatInterface />
      <Toaster  richColors/>
    </div>
  );
}