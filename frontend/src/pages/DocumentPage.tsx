import { useEffect, useMemo, useState } from "react";
import { CategoryFilterComponent } from "../components/sub/CategoryFilterComponent";
import { DocumentCard } from "../forms/DocumentCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchDocuments } from "../redux/documentSlice";


export const DocumentPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { items: allDocuments, loading, error } = useSelector((state: RootState) => state.documents);

    const [activeTag, setActiveTag] = useState<string>("All");
    const [activeSort, setActiveSort] = useState<string>("Popular");


   useEffect(() => {
        if (allDocuments.length === 0) {
            dispatch(fetchDocuments());
        }
    }, [dispatch, allDocuments.length]);

    const filteredDocuments = useMemo(() => {
        let result = [...allDocuments];

        if (activeTag !== "All") {
            result = result.filter(doc => doc.tags && doc.tags.includes(activeTag));
        }

        switch (activeSort) {
            case "Latest":
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "Oldest":
                result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case "Popular":
                result.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
        }
        return result;
    }, [allDocuments, activeTag, activeSort]);

    return (
        <div className="relative min-h-screen h-auto w-full gradient-pattern">
            <div className="mx-auto py-10 w-[90%] lg:w-[50%] md:w-[80%] sm:w-[90%]">
                <CategoryFilterComponent 
                    tags={["Frontend", "Backend", "Design", "AWS"]} 
                    selectedTag={activeTag}
                    selectedSort={activeSort}
                    onSelectTag={setActiveTag}
                    onSelectSort={setActiveSort}
                />
                
                <div className="mb-12 flex flex-col space-y-6">
                    {loading ? (
                        <div className="text-white text-center mt-10">Loading documents...</div>
                    ) : error ? (
                        <div className="text-red-500 text-center mt-10">{error}</div>
                    ) : filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
                            <DocumentCard key={doc._id} document={doc} />
                        ))
                    ) : (
                        <div className="text-white/60 text-center py-10">No documents found</div>
                    )}
                </div>
            </div>
        </div>
    );
};