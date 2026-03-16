import { useParams } from "react-router-dom";
import { useState } from "react";
import { useUserDashboard } from "../../../hooks/useUserDashboard";
import UserHeaderSection from "../components/UserHeaderSection";
import UserBusinessSection from "../components/UserBusinessSection";
import UserOrdersSection from "../components/UserOrderSection";
import UserProducerSection from "../components/UserProducerSection";
import { useAdminPage } from "../../../hooks/useAdminPage";
import UserAddressSection from "../components/UserAddressSection";
import UserBookmarksSection from "../components/UserBookmarksSection";
import Loader from "../../../components/admin/Loader";


export default function UserPage() {
  const { id } = useParams<{ id: string }>();

  useAdminPage("Dashboard utilisateur")

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useUserDashboard(
    id!,
    page,
    limit
  );


  if (isLoading) {
    return (
      <Loader />
    );
  }
  if (isError || !data) return <div>Error loading user</div>;


  return (
    <div className="space-y-8 p-6 mx-auto max-w-7xl">

      <div className="flex flex-row gap-x-5">

        <div className="basis-1/2">
          {/* 1️⃣ HEADER */}
          <UserHeaderSection user={data.user} />
        </div>

        <div className="basis-1/2 flex items-center">

          <div className="w-full space-y-5">
            {/* 2️⃣ BUSINESS KPIs */}
            <UserBusinessSection business={data.business} />

            {/* 3️⃣ PRODUCER */}
            <UserProducerSection
              isProducer={data.user.isProducer}
              producerId={data.user.producerId}
            />
          </div>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-x-10">
        <div className="space-y-5">
          <UserAddressSection addresses={data.user.addresses ?? []}/>
          <UserBookmarksSection bookmarks={data.user.bookmarks ?? []} />
        </div>
        
        <div className="col-span-2">
          {/* 4️⃣ RECENT ORDERS */}
          {id && (
            <UserOrdersSection
              userId={id}
            />
          )}
        </div>
      </div>


      
      
    </div>
  );
}
