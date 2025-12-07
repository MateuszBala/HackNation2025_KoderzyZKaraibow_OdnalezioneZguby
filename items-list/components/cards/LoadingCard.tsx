import { Card } from "../ui/Card";

/**
 * Loading card
 * @returns card for loading
 */
export default function LoadingCard(){
    return (
        <Card>
            <div className="text-center py-12">
                <p className="text-[#666] mb-2">
                    Ładowanie...
                </p>
            </div>
        </Card>
    );
}