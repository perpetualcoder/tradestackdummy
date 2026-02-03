export const ACTION_EVENT = "tradestack:marketplace-action";

export function triggerMockAction(label: string) {
  window.dispatchEvent(
    new CustomEvent(ACTION_EVENT, {
      detail: {
        label,
        timestamp: Date.now(),
      },
    })
  );
}
