import { AlertCircle } from "lucide-react";
import { Card } from "../ui/Card";

interface Params{
  message?: string;
}

/**
 * Error card
 * @param {string} message error message
 * @returns Card with error text
 */
export default function ErrorCard({message = "Coś poszło nie tak!"}: Params){
  return (
    <Card>
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-[#CCCCCC] mx-auto mb-4" />
        <p className="text-[#666] mb-2">
          {message}
        </p>
      </div>
    </Card>
  );
}