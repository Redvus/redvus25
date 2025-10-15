import React, { useState, useMemo } from 'react';

// Типы мероприятий и данные
const EVENT_TYPES = {
  LECTURE: 'Лекция',
  WORKSHOP: 'Мастер-класс',
  EXHIBITION: 'Выставка',
  CONCERT: 'Концерт',
  SPORT: 'Спортивное мероприятие'
};

const BRANCHES = {
  MAIN: 'Главный филиал',
  NORTH: 'Северный филиал',
  SOUTH: 'Южный филиал',
  EAST: 'Восточный филиал'
};

const AGE_GROUPS = {
  CHILDREN: 'Дети (6-12 лет)',
  TEEN: 'Подростки (13-17 лет)',
  ADULT: 'Взрослые (18+ лет)',
  FAMILY: 'Семейное мероприятие',
  ALL: 'Все возрасты'
};

// Моковые данные событий
const initialEvents = [
  {
    id: 1,
    title: 'Мастер-класс по живописи',
    description: 'Увлекательный мастер-класс для начинающих художников. Все материалы предоставляются.',
    date: '2024-01-15',
    time: '15:00',
    branch: BRANCHES.MAIN,
    type: EVENT_TYPES.WORKSHOP,
    ageGroup: AGE_GROUPS.ADULT,
    duration: '2 часа',
    price: 500,
    maxParticipants: 15,
    currentParticipants: 8
  },
  {
    id: 2,
    title: 'Научная лекция о космосе',
    description: 'Погружение в тайны вселенной с известным астрофизиком.',
    date: '2024-01-16',
    time: '18:30',
    branch: BRANCHES.NORTH,
    type: EVENT_TYPES.LECTURE,
    ageGroup: AGE_GROUPS.TEEN,
    duration: '1.5 часа',
    price: 0,
    maxParticipants: 50,
    currentParticipants: 45
  },
  {
    id: 3,
    title: 'Выставка современного искусства',
    description: 'Работы местных художников в различных техниках и стилях.',
    date: '2024-01-17',
    time: '10:00',
    branch: BRANCHES.MAIN,
    type: EVENT_TYPES.EXHIBITION,
    ageGroup: AGE_GROUPS.ALL,
    duration: '8 часов',
    price: 200,
    maxParticipants: null,
    currentParticipants: null
  },
  {
    id: 4,
    title: 'Детский кулинарный мастер-класс',
    description: 'Веселый кулинарный урок для детей с профессиональным шеф-поваром.',
    date: '2024-01-18',
    time: '11:00',
    branch: BRANCHES.SOUTH,
    type: EVENT_TYPES.WORKSHOP,
    ageGroup: AGE_GROUPS.CHILDREN,
    duration: '2 часа',
    price: 300,
    maxParticipants: 12,
    currentParticipants: 10
  },
  {
    id: 5,
    title: 'Классический концерт',
    description: 'Вечер классической музыки в исполнении камерного оркестра.',
    date: '2024-01-19',
    time: '19:00',
    branch: BRANCHES.EAST,
    type: EVENT_TYPES.CONCERT,
    ageGroup: AGE_GROUPS.ADULT,
    duration: '2 часа',
    price: 800,
    maxParticipants: 100,
    currentParticipants: 75
  },
  {
    id: 6,
    title: 'Семейный спортивный день',
    description: 'Веселые спортивные игры и соревнования для всей семьи.',
    date: '2024-01-20',
    time: '12:00',
    branch: BRANCHES.NORTH,
    type: EVENT_TYPES.SPORT,
    ageGroup: AGE_GROUPS.FAMILY,
    duration: '4 часа',
    price: 0,
    maxParticipants: null,
    currentParticipants: null
  }
];

const Calendar = () => {
  const [events] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState('');
  const [filters, setFilters] = useState({
    branch: '',
    type: '',
    ageGroup: ''
  });

  // Фильтрация событий
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesDate = !selectedDate || event.date === selectedDate;
      const matchesBranch = !filters.branch || event.branch === filters.branch;
      const matchesType = !filters.type || event.type === filters.type;
      const matchesAge = !filters.ageGroup || event.ageGroup === filters.ageGroup;

      return matchesDate && matchesBranch && matchesType && matchesAge;
    });
  }, [events, selectedDate, filters]);

  // Обработчики фильтров
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSelectedDate('');
    setFilters({
      branch: '',
      type: '',
      ageGroup: ''
    });
  };

  // Получение уникальных дат для календаря
  const eventDates = [...new Set(events.map(event => event.date))];

  return (
    <div className="calendar-container">
      <h1>Календарь событий учреждения</h1>
      
      {/* Фильтры */}
      <div className="filters-section">
        <h2>Фильтры</h2>
        
        <div className="filters-grid">
          {/* Фильтр по дате */}
          <div className="filter-group">
            <label>Дата:</label>
            <select 
              value={selectedDate} 
              onChange={(e) => handleDateChange(e.target.value)}
            >
              <option value="">Все даты</option>
              {eventDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('ru-RU')}
                </option>
              ))}
            </select>
          </div>

          {/* Фильтр по филиалу */}
          <div className="filter-group">
            <label>Филиал:</label>
            <select 
              value={filters.branch} 
              onChange={(e) => handleFilterChange('branch', e.target.value)}
            >
              <option value="">Все филиалы</option>
              {Object.values(BRANCHES).map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          {/* Фильтр по типу мероприятия */}
          <div className="filter-group">
            <label>Тип мероприятия:</label>
            <select 
              value={filters.type} 
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">Все типы</option>
              {Object.values(EVENT_TYPES).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Фильтр по возрастной группе */}
          <div className="filter-group">
            <label>Возрастная группа:</label>
            <select 
              value={filters.ageGroup} 
              onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
            >
              <option value="">Все возрасты</option>
              {Object.values(AGE_GROUPS).map(age => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="clear-filters" onClick={clearFilters}>
          Очистить фильтры
        </button>
      </div>

      {/* Результаты */}
      <div className="results-section">
        <h2>
          Найдено мероприятий: {filteredEvents.length}
          {filteredEvents.length !== events.length && ` (из ${events.length})`}
        </h2>

        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>По вашему запросу мероприятий не найдено</p>
            <button onClick={clearFilters}>Показать все мероприятия</button>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Компонент карточки события
const EventCard = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getParticipantsInfo = () => {
    if (event.maxParticipants === null) return 'Без ограничений';
    return `${event.currentParticipants}/${event.maxParticipants} мест`;
  };

  const getPriceInfo = () => {
    return event.price === 0 ? 'Бесплатно' : `${event.price} руб.`;
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <h3>{event.title}</h3>
        <span className="event-type">{event.type}</span>
      </div>

      <div className="event-info">
        <div className="info-row">
          <span className="label">📅 Дата:</span>
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="info-row">
          <span className="label">⏰ Время:</span>
          <span>{event.time}</span>
        </div>
        <div className="info-row">
          <span className="label">🏢 Филиал:</span>
          <span>{event.branch}</span>
        </div>
        <div className="info-row">
          <span className="label">👥 Возраст:</span>
          <span>{event.ageGroup}</span>
        </div>
        <div className="info-row">
          <span className="label">💰 Стоимость:</span>
          <span className={event.price === 0 ? 'free' : 'paid'}>
            {getPriceInfo()}
          </span>
        </div>
        <div className="info-row">
          <span className="label">👥 Участники:</span>
          <span>{getParticipantsInfo()}</span>
        </div>
      </div>

      <button 
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Скрыть описание' : 'Подробнее'}
      </button>

      {showDetails && (
        <div className="event-details">
          <p>{event.description}</p>
          <div className="event-meta">
            <span>⏱️ Продолжительность: {event.duration}</span>
          </div>
          <button className="register-btn">
            Записаться
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;