import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

async function ChatToFilePage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  auth().protect();
  const { userId } = await auth();

  const ref = await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .get();
  const url = ref.data()?.downloadUrl;

  return (
    <div className="grid lg:grid-cols-5 h-full overflow-hidden">
      {/* Right section */}
      <div>{/* chat */}</div>
      {/* Left section */}
      <div>{/* pdf View */}</div>
    </div>
  );
}

export default ChatToFilePage;
