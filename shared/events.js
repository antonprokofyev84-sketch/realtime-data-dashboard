export const EVENT_TYPES = ["info", "warning", "error"];

export const EVENT_MESSAGES = [
  "User login successful",
  "Payment processed",
  "File uploaded",
  "API request failed",
  "Database connection lost",
  "Cache invalidated",
  "New order created",
  "Email sent to customer",
];

export const EVENT_SOURCES = [
  "auth-service",
  "payments-service",
  "storage-service",
  "api-gateway",
  "database",
  "cache-layer",
];

export const createMockEvents = (now = Date.now()) => [
  {
    id: "event-1",
    type: "info",
    message: "info message example",
    timestamp: now - 30000,
    source: "test-source-0",
  },
  {
    id: "event-2",
    type: "warning",
    message: "warning message example",
    timestamp: now - 25000,
    source: "test-source-1",
  },
  {
    id: "event-3",
    type: "error",
    message: "error message example",
    timestamp: now - 20000,
    source: "test-source-2",
  },
  {
    id: "event-4",
    type: "info",
    message: "info message example",
    timestamp: now - 15000,
    source: "test-source-0",
  },
  {
    id: "event-5",
    type: "warning",
    message: "warning message example",
    timestamp: now - 10000,
    source: "test-source-3",
  },
  {
    id: "event-6",
    type: "error",
    message: "error message example",
    timestamp: now - 5000,
    source: "test-source-1",
  },
];

export const mockEvents = createMockEvents();
