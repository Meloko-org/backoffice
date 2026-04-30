import { useNavigate } from "react-router-dom";
import type { ProducerActionContext } from "../config/producer.action";
import { useMemo } from "react";
import { useDefineConfirm } from "../../../hooks/useDefineConfirm";

export function useProducerActionsContext(): ProducerActionContext {

  const navigate = useNavigate();
  const defineConfirm = useDefineConfirm();


  return useMemo(() => (
    {
      navigate,
      defineConfirm,
    }
  ), [navigate,
      defineConfirm,
    ])
}