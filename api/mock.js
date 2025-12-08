// Mock API for Vercel deployment
const mockData = {
  sessions: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1vY2sgVXNlciIsImVtYWlsIjoibW9ja3VzZXJAZXhhbXBsZS5jb20ifQ.mock",
    user: {
      id: 1,
      name: "João Silva",
      email: "joao@example.com",
      avatar: null,
      provider: false
    }
  },
  users: [
    {
      id: 1,
      name: "João Silva",
      email: "joao@example.com",
      avatar: null,
      provider: false
    }
  ],
  providers: [
    {
      id: 2,
      name: "Barbeiro Master",
      email: "barbeiro@example.com",
      avatar: {
        id: 1,
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Barbeiro1",
        path: "avatar1.jpg"
      },
      provider: true
    },
    {
      id: 3,
      name: "Corte Premium",
      email: "premium@example.com",
      avatar: {
        id: 2,
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Barbeiro2",
        path: "avatar2.jpg"
      },
      provider: true
    },
    {
      id: 4,
      name: "Estilo Top",
      email: "estilo@example.com",
      avatar: {
        id: 3,
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Barbeiro3",
        path: "avatar3.jpg"
      },
      provider: true
    }
  ],
  appointments: [
    {
      id: 1,
      date: "2025-12-10T10:00:00.000Z",
      past: false,
      cancelable: true,
      canceled_at: null,
      provider: {
        id: 2,
        name: "Barbeiro Master",
        avatar: {
          id: 1,
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Barbeiro1",
          path: "avatar1.jpg"
        }
      }
    },
    {
      id: 2,
      date: "2025-12-11T14:00:00.000Z",
      past: false,
      cancelable: true,
      canceled_at: null,
      provider: {
        id: 3,
        name: "Corte Premium",
        avatar: {
          id: 2,
          url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Barbeiro2",
          path: "avatar2.jpg"
        }
      }
    }
  ],
  notifications: [
    {
      id: 1,
      content: "Novo agendamento para 10/12 às 10:00",
      read: false,
      createdAt: "2025-12-08T10:00:00.000Z"
    },
    {
      id: 2,
      content: "Agendamento cancelado para 09/12",
      read: false,
      createdAt: "2025-12-08T09:00:00.000Z"
    }
  ]
};

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  const path = url.split('?')[0];

  // Health check
  if (path === '/api' || path === '/api/') {
    return res.status(200).json({
      message: 'BarberApp Mock API is running 🚀',
      version: '1.0.0',
      status: 'active',
      timestamp: new Date().toISOString()
    });
  }

  // Sessions - Login
  if (path === '/api/sessions' && method === 'POST') {
    return res.status(200).json(mockData.sessions);
  }

  // Users - Register
  if (path === '/api/users' && method === 'POST') {
    return res.status(200).json(mockData.users[0]);
  }

  // Users - Update
  if (path === '/api/users' && method === 'PUT') {
    const updatedUser = { ...mockData.users[0], ...req.body };
    return res.status(200).json(updatedUser);
  }

  // Providers
  if (path === '/api/providers' && method === 'GET') {
    return res.status(200).json(mockData.providers);
  }

  // Provider availability
  if (path.match(/\/api\/providers\/\d+\/available/) && method === 'GET') {
    const availableTimes = [
      { time: '08:00', value: '2025-12-10T08:00:00.000Z', available: true },
      { time: '09:00', value: '2025-12-10T09:00:00.000Z', available: true },
      { time: '10:00', value: '2025-12-10T10:00:00.000Z', available: false },
      { time: '11:00', value: '2025-12-10T11:00:00.000Z', available: true },
      { time: '12:00', value: '2025-12-10T12:00:00.000Z', available: true },
      { time: '13:00', value: '2025-12-10T13:00:00.000Z', available: false },
      { time: '14:00', value: '2025-12-10T14:00:00.000Z', available: true },
      { time: '15:00', value: '2025-12-10T15:00:00.000Z', available: true },
      { time: '16:00', value: '2025-12-10T16:00:00.000Z', available: true },
      { time: '17:00', value: '2025-12-10T17:00:00.000Z', available: true },
      { time: '18:00', value: '2025-12-10T18:00:00.000Z', available: false },
    ];
    return res.status(200).json(availableTimes);
  }

  // Appointments - List
  if (path === '/api/appointments' && method === 'GET') {
    return res.status(200).json(mockData.appointments);
  }

  // Appointments - Create
  if (path === '/api/appointments' && method === 'POST') {
    const newAppointment = {
      id: mockData.appointments.length + 1,
      ...req.body,
      past: false,
      cancelable: true,
      canceled_at: null,
      provider: mockData.providers.find(p => p.id === req.body.provider_id) || mockData.providers[0]
    };
    mockData.appointments.push(newAppointment);
    return res.status(200).json(newAppointment);
  }

  // Appointments - Delete
  if (path.match(/\/api\/appointments\/\d+/) && method === 'DELETE') {
    const id = parseInt(path.split('/').pop());
    const appointment = mockData.appointments.find(a => a.id === id);
    if (appointment) {
      appointment.canceled_at = new Date().toISOString();
      return res.status(200).json(appointment);
    }
    return res.status(404).json({ error: 'Appointment not found' });
  }

  // Schedule
  if (path === '/api/schedule' && method === 'GET') {
    return res.status(200).json(mockData.appointments);
  }

  // Notifications - List
  if (path === '/api/notifications' && method === 'GET') {
    return res.status(200).json(mockData.notifications);
  }

  // Notifications - Update
  if (path.match(/\/api\/notifications\/\d+/) && method === 'PUT') {
    const id = parseInt(path.split('/').pop());
    const notification = mockData.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      return res.status(200).json(notification);
    }
    return res.status(404).json({ error: 'Notification not found' });
  }

  // Files - Upload
  if (path === '/api/files' && method === 'POST') {
    const newFile = {
      id: Math.floor(Math.random() * 1000),
      name: req.body.name || 'avatar.jpg',
      path: req.body.path || 'avatar.jpg',
      url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
    };
    return res.status(200).json(newFile);
  }

  // Default 404
  return res.status(404).json({ error: 'Endpoint not found' });
}
