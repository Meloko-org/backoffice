// UserPage.tsx

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useUserDashboard } from "../../../hooks/useUserDashboard";
import UserHeaderSection from "../components/UserHeaderSection";
import UserBusinessSection from "../components/UserBusinessSection";
import UserOrdersSection from "../components/UserOrderSection";
import UserProducerSection from "../components/UserProducerSection";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { BallTriangle } from "react-loader-spinner";

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
      <div className="w-full h-full flex justify-center items-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#98B66E"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  if (isError || !data) return <div>Error loading user</div>;


  return (
    <div className="space-y-8 p-6 mx-auto max-w-7xl">

      <div className="flex flex-row gap-x-5">

        <div className="basis-2/5">
          {/* 1️⃣ HEADER */}
          <UserHeaderSection user={data.user} />
        </div>

        <div className="basis-3/5 flex items-center">

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


      {/* 4️⃣ RECENT ORDERS */}
      {id && (
        <UserOrdersSection
          userId={id}
        />
      )}
      
    </div>
  );
}
