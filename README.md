# Real-Time User Management App

## Features

- [x] Responsive Design

### User Creation Form

- [x] Implement validation with appropriate user feedback (e.g., inline errors)

#### Required Fields:

- [x] Full Name: Minimum 2 characters, only letters and spaces allowed
- [x] Email: Valid email format
- [x] Role: Dropdown with Developer, Designer, Manger, Other

#### Optional Field:

- [x] Department: Text input, max 50 characters

### Real-Time User List

- [x] Display all users in a real-time updating table.
      Table includes:
- [x] Full Name, Email, Role, Department
- [x] 'Created X minutes ago' timestamp
- [x] User avatars (initials)
- [x] Table search, sort, filters, and column management
- [x] Create and Delete actions (delete action works only on the client side because the server does not expose userId)

### Connection Management

- [x] Show connection status (connected, disconnected, reconnecting)
- [ ] Auto-reconnect with exponential backoff
- [ ] Queue messages during disconnection # TODO: check this
- [x] Resync user list on reconnect
