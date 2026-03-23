import { SalesRecordSkeletonCard } from "@/components/sale/salesRecordSkeleton";
export default function Loading(){
    return (
        <div className="flex flex-col gap-6 items-center p-6">
            <div className="p-6 rounded-lg w-[90%] md:w-[55%] bg-tertiary">

            </div>

            <div className="bg-tertiary p-2 w-[95%] md:w-[90%] rounded-lg flex flex-col gap-3 animate-pulse">

            {Array.from({ length: 8 }).map((_, i) => (
                <SalesRecordSkeletonCard key={i} />
            ))}
            </div>

        </div>
    )
}