import React from "react";
import type { RightPanelConfig, RightPanelContextMap, RightPanelType } from "../layouts/admin/registries/rightPanel/rightPanelRegistry";

export function renderRightPanel<T extends RightPanelType>(
  config: RightPanelConfig<T>,
  context: RightPanelContextMap[T]
) {

  const Component = config.component as React.ComponentType<any>;

  const key =
    context.type +
    ("id" in context ? context.id : "");

  return React.createElement(Component, {
    key,
    context,
  });
}