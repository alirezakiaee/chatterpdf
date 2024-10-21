import { Button } from './ui/button';
import { PlusCircleIcon } from 'lucide-react';

function PlaceholderDocument() {
  return (
    <Button className="flex m-4 flex-col items-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400">
        <PlusCircleIcon className="h-16 w-16"/>
        <p>Add a new document</p>
    </Button>
      
  )
}

export default PlaceholderDocument