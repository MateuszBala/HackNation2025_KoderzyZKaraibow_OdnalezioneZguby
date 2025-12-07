import { AlertCircle } from "lucide-react";
import { Card } from "../ui/Card";

/**
 * Error Card
 */
export default function ErrorCard(){
  return (
    <Card>
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-[#CCCCCC] mx-auto mb-4" />
        <p className="text-[#666] mb-2">
          Coś poszło nie tak!
        </p>
      </div>
    </Card>
  );
}