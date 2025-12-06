import { NextResponse } from "next/server";
import { getDocumentsWithIds, removeDocument } from "@/firebase";

export async function POST() {
  try {
    const pageViews = await getDocumentsWithIds("page-views");
    
    // Delete all page views
    const deletePromises = pageViews.map((view: any) => {
      if (view.id) {
        return removeDocument("page-views", view.id);
      }
      return Promise.resolve();
    });

    await Promise.all(deletePromises);
    
    return NextResponse.json({ success: true, deleted: pageViews.length });
  } catch (error) {
    console.error("Error resetting visits:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset visits" },
      { status: 500 }
    );
  }
}

