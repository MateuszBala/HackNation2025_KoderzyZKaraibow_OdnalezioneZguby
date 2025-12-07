import { Package } from "lucide-react";
import { Card } from "../ui/Card";

/**
 * Empty message card
 * @returns card
 */
export default function EmptyCard(){
    return (
        <Card>
            <div className="text-center py-12">
                <Package className="w-16 h-16 text-[#CCCCCC] mx-auto mb-4" />
                <p className="text-[#666] mb-2">
                    Nie dodano jeszcze żadnych przedmiotów.
                </p>
            </div>
        </Card>
    );
}