# Notification System Design

## Overview

The Notification System is designed to fetch, prioritize, and display campus notifications in an efficient and user-friendly manner. The system integrates with an external API, applies priority-based sorting, and provides filtering, pagination, and user interaction features.

---

## Priority Logic

Each notification is assigned a priority based on its type:

* **Placement** → Highest priority (Weight = 3)
* **Result** → Medium priority (Weight = 2)
* **Event** → Lowest priority (Weight = 1)

A final score is calculated using:

```
Score = Weight + Recency
```

Where:

* **Recency** is derived from the timestamp (newer notifications have higher value)

Notifications are sorted in descending order of score, and only the **top 10** are displayed.

---

## Data Flow

1. The frontend sends a request to the Next.js API route
2. The API route forwards the request to the external evaluation API
3. The response is received and returned to the frontend
4. The frontend processes:

   * Sorting (priority + recency)
   * Filtering
   * Display logic

---

## Features Implemented

### 1. Priority-Based Display

* Notifications are ranked using weighted scoring
* Only the top 10 most relevant notifications are shown

---

### 2. Filtering

Users can filter notifications by type:

* All
* Placement
* Result
* Event

Filtering is handled dynamically using frontend state.

---

### 3. Pagination

The system supports API-based pagination using:

* `page`
* `limit` (maximum 10)

Users can navigate using **Next** and **Previous** buttons.

---

### 4. Seen / Unseen Notifications

* New notifications are marked with a **“New” indicator**
* Clicking a notification marks it as seen
* Seen notifications are visually dimmed

---

### 5. Logging Middleware

A custom logging function is implemented:

```
Log(level, package, message)
```

Logs are sent to a centralized logging API instead of using console logs.

Logging is used for:

* API success and failure
* User interactions (filter changes, clicks)
* Error tracking

---

## Error Handling

* Invalid or expired tokens are handled with proper error responses
* API failures are logged using the logging middleware
* Empty or invalid responses are safely handled in the UI

---

## Scalability Considerations

* API pagination prevents large data loads
* Sorting is done efficiently on a limited dataset
* The system can be extended using:

  * Min Heap for maintaining top 10 in real-time
  * Backend-level filtering for large-scale data
* Logging enables monitoring and debugging at scale

---

## Conclusion

The system provides a structured and scalable approach to handling notifications, combining priority-based logic, user interaction, and proper logging practices. It follows real-world development patterns and ensures maintainability and extensibility.

