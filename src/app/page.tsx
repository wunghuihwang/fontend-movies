import ProtectedRoute from "@/shared/ui/ProtectedRoute";

export default function Home() {
    return (
        <ProtectedRoute>
            <div>마이페이지</div>
        </ProtectedRoute>
    );
}
