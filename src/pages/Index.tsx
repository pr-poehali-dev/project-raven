import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const customerReviews: Review[] = [
    {
      id: 1,
      author: 'Анна Иванова',
      avatar: 'АИ',
      rating: 5,
      date: '15 ноября 2024',
      comment: 'Отличная работа! Бот для Telegram работает стабильно, все функции реализованы идеально. Рекомендую!'
    },
    {
      id: 2,
      author: 'Михаил Петров',
      avatar: 'МП',
      rating: 5,
      date: '10 ноября 2024',
      comment: 'Заказывал чат-бота для сайта - результат превзошёл ожидания. Быстро, качественно, профессионально!'
    },
    {
      id: 3,
      author: 'Елена Сидорова',
      avatar: 'ЕС',
      rating: 4,
      date: '5 ноября 2024',
      comment: 'Хорошая работа с автоматизацией задач. Бот экономит массу времени. Спасибо!'
    },
    {
      id: 4,
      author: 'Дмитрий Смирнов',
      avatar: 'ДС',
      rating: 5,
      date: '1 ноября 2024',
      comment: 'Сотрудничаю уже третий раз. Всегда всё на высоте - от идеи до реализации!'
    },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/ad88e080-1575-403a-a66f-a4db62e33c70', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Успех!",
          description: data.message || "Сообщение отправлено успешно!",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    try {
      const response = await fetch('https://functions.poehali.dev/ad88e080-1575-403a-a66f-a4db62e33c70', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Чат поддержки',
          email: 'chat@support.com',
          subject: 'Сообщение из чата',
          message: chatMessage
        }),
      });

      if (response.ok) {
        toast({
          title: "Сообщение отправлено!",
          description: "Мы ответим вам в ближайшее время.",
        });
        setChatMessage('');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение.",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= rating ? "fill-accent text-accent" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Icon name="Bot" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Codeko
              </h1>
            </div>
            
            <nav className="hidden md:flex gap-4">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="font-medium"
              >
                Главная
              </Button>
              <Button
                variant={activeTab === 'services' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('services')}
                className="font-medium"
              >
                Услуги
              </Button>
              <Button
                variant={activeTab === 'portfolio' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('portfolio')}
                className="font-medium"
              >
                Портфолио
              </Button>
              <Button
                variant={activeTab === 'blog' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('blog')}
                className="font-medium"
              >
                Блог
              </Button>
              <Button
                variant={activeTab === 'reviews' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('reviews')}
                className="font-medium"
              >
                Отзывы
              </Button>
              <Button
                variant={activeTab === 'contacts' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('contacts')}
                className="font-medium"
              >
                Контакты
              </Button>
              <Button
                variant={activeTab === 'faq' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('faq')}
                className="font-medium"
              >
                FAQ
              </Button>
            </nav>

            <Button className="gradient-primary text-white font-semibold">
              Заказать бота
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <section className="mb-16 text-center max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Создаю умных ботов для вашего бизнеса
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Автоматизация процессов, чат-боты для Telegram, WhatsApp и веб-сайтов. Профессиональная разработка под ключ.
              </p>
              <Button size="lg" className="gradient-primary text-white font-semibold text-lg px-8 py-6">
                Закажи бота сейчас!
                <Icon name="Sparkles" size={20} className="ml-2" />
              </Button>
            </section>

            <section className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-12">Примеры моих работ</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover-scale border-2 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon name="MessageCircle" size={24} className="text-white" />
                    </div>
                    <CardTitle>Telegram-бот для интернет-магазина</CardTitle>
                    <CardDescription>
                      Автоматизация заказов, консультации клиентов, уведомления о статусе доставки
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale border-2 hover:border-secondary/50 transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Users" size={24} className="text-white" />
                    </div>
                    <CardTitle>Чат-бот для службы поддержки</CardTitle>
                    <CardDescription>
                      Ответы на частые вопросы, переадресация к оператору, сбор обратной связи
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover-scale border-2 hover:border-accent/50 transition-all">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Zap" size={24} className="text-white" />
                    </div>
                    <CardTitle>Бот для автоматизации задач</CardTitle>
                    <CardDescription>
                      Парсинг данных, отправка отчётов, напоминания, интеграция с CRM
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>

            <section className="text-center bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white rounded-2xl p-12">
              <h3 className="text-3xl font-bold mb-4">Готов начать?</h3>
              <p className="text-xl mb-6 opacity-90">
                Напиши мне, и я создам идеального бота для твоих задач!
              </p>
              <Button size="lg" variant="secondary" className="font-semibold">
                Связаться со мной
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </section>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="animate-fade-in max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Мои услуги
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Полный спектр разработки ботов для любых задач
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 hover-scale">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageSquare" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Telegram-боты</h3>
                    <p className="text-muted-foreground mb-3">
                      Создание ботов для Telegram: от простых чат-ботов до сложных систем автоматизации
                    </p>
                    <Badge className="gradient-primary border-0 text-white">От 15 000 ₽</Badge>
                    <span className="text-sm text-muted-foreground ml-2">• 5-7 дней</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-scale">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">WhatsApp-боты</h3>
                    <p className="text-muted-foreground mb-3">
                      Разработка ботов для WhatsApp Business API с интеграцией в ваши системы
                    </p>
                    <Badge className="gradient-accent border-0 text-white">От 20 000 ₽</Badge>
                    <span className="text-sm text-muted-foreground ml-2">• 7-10 дней</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-scale">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Globe" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Чат-боты для сайтов</h3>
                    <p className="text-muted-foreground mb-3">
                      Интеллектуальные чат-боты с AI для консультации посетителей вашего сайта
                    </p>
                    <Badge className="gradient-primary border-0 text-white">От 25 000 ₽</Badge>
                    <span className="text-sm text-muted-foreground ml-2">• 7-14 дней</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-scale">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Settings" size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Автоматизация задач</h3>
                    <p className="text-muted-foreground mb-3">
                      Боты для автоматизации рутинных задач, парсинга, уведомлений, интеграций
                    </p>
                    <Badge className="gradient-accent border-0 text-white">От 10 000 ₽</Badge>
                    <span className="text-sm text-muted-foreground ml-2">• 3-5 дней</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8 gradient-primary text-white">
              <h3 className="text-2xl font-bold mb-4 text-center">Что входит в разработку?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="flex-shrink-0 mt-1" />
                  <span>Анализ задачи и консультация</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="flex-shrink-0 mt-1" />
                  <span>Разработка архитектуры бота</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="flex-shrink-0 mt-1" />
                  <span>Программирование и тестирование</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="flex-shrink-0 mt-1" />
                  <span>Деплой и настройка хостинга</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="flex-shrink-0 mt-1" />
                  <span>Инструкция по использованию</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="flex-shrink-0 mt-1" />
                  <span>Месяц поддержки после запуска</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="animate-fade-in max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Портфолио
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Реализованные проекты и успешные кейсы
            </p>

            <div className="space-y-6">
              <Card className="overflow-hidden hover-scale">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-pink-600 p-8 flex items-center justify-center">
                    <Icon name="ShoppingCart" size={64} className="text-white" />
                  </div>
                  <CardContent className="md:w-2/3 p-6">
                    <Badge className="mb-3 gradient-primary border-0 text-white">Telegram</Badge>
                    <h3 className="text-2xl font-bold mb-3">Бот для интернет-магазина электроники</h3>
                    <p className="text-muted-foreground mb-4">
                      Разработан полнофункциональный бот для приёма заказов, консультации клиентов и отслеживания доставки.
                      Интеграция с CRM и системой оплаты. Увеличил конверсию на 40%.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Telegram Bot API</Badge>
                      <Badge variant="outline">PostgreSQL</Badge>
                      <Badge variant="outline">Stripe Payment</Badge>
                    </div>
                  </CardContent>
                </div>
              </Card>

              <Card className="overflow-hidden hover-scale">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-pink-600 to-orange-600 p-8 flex items-center justify-center">
                    <Icon name="Headphones" size={64} className="text-white" />
                  </div>
                  <CardContent className="md:w-2/3 p-6">
                    <Badge className="mb-3 gradient-accent border-0 text-white">Веб-сайт</Badge>
                    <h3 className="text-2xl font-bold mb-3">AI чат-бот для службы поддержки</h3>
                    <p className="text-muted-foreground mb-4">
                      Интеллектуальный бот с использованием GPT для ответов на вопросы клиентов 24/7.
                      Снизил нагрузку на операторов на 60%, время ответа сократилось до 10 секунд.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">OpenAI API</Badge>
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">WebSocket</Badge>
                    </div>
                  </CardContent>
                </div>
              </Card>

              <Card className="overflow-hidden hover-scale">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-orange-600 to-purple-600 p-8 flex items-center justify-center">
                    <Icon name="Calendar" size={64} className="text-white" />
                  </div>
                  <CardContent className="md:w-2/3 p-6">
                    <Badge className="mb-3 gradient-primary border-0 text-white">Telegram</Badge>
                    <h3 className="text-2xl font-bold mb-3">Бот для записи на услуги</h3>
                    <p className="text-muted-foreground mb-4">
                      Система онлайн-записи для салона красоты с напоминаниями, управлением расписанием и автоматическим
                      подтверждением. Обрабатывает 200+ записей ежедневно.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Python</Badge>
                      <Badge variant="outline">Aiogram</Badge>
                      <Badge variant="outline">Redis</Badge>
                      <Badge variant="outline">Google Calendar API</Badge>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Блог
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Статьи о ботах, кейсы и полезные советы
            </p>

            <div className="grid gap-6">
              <Card className="hover-scale overflow-hidden">
                <CardHeader>
                  <Badge className="mb-3 w-fit">Руководство</Badge>
                  <CardTitle className="text-2xl">Как выбрать подходящего бота для вашего бизнеса?</CardTitle>
                  <CardDescription className="text-base">15 ноября 2024 • 5 мин чтения</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Разбираем основные типы ботов, их возможности и сценарии применения. Поможем определить,
                    какой бот лучше всего подойдёт именно для ваших задач...
                  </p>
                  <Button variant="link" className="p-0 h-auto gradient-primary bg-clip-text text-transparent">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-scale overflow-hidden">
                <CardHeader>
                  <Badge className="mb-3 w-fit gradient-accent border-0 text-white">Кейс</Badge>
                  <CardTitle className="text-2xl">Как бот увеличил продажи интернет-магазина на 40%</CardTitle>
                  <CardDescription className="text-base">10 ноября 2024 • 7 мин чтения</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Реальная история: разработка Telegram-бота для магазина электроники. Показываем метрики,
                    функционал и результаты внедрения за 3 месяца...
                  </p>
                  <Button variant="link" className="p-0 h-auto gradient-primary bg-clip-text text-transparent">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-scale overflow-hidden">
                <CardHeader>
                  <Badge className="mb-3 w-fit">Новости</Badge>
                  <CardTitle className="text-2xl">Топ-5 трендов в разработке ботов в 2024 году</CardTitle>
                  <CardDescription className="text-base">5 ноября 2024 • 4 мин чтения</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Что нового в мире чат-ботов? AI-интеграции, голосовые боты, мультиплатформенность и другие
                    актуальные тенденции индустрии...
                  </p>
                  <Button variant="link" className="p-0 h-auto gradient-primary bg-clip-text text-transparent">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-scale overflow-hidden">
                <CardHeader>
                  <Badge className="mb-3 w-fit gradient-primary border-0 text-white">Советы</Badge>
                  <CardTitle className="text-2xl">7 ошибок при создании бота, которых стоит избегать</CardTitle>
                  <CardDescription className="text-base">1 ноября 2024 • 6 мин чтения</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Делюсь опытом: типичные ошибки при разработке ботов и как их избежать. От выбора платформы
                    до UX-дизайна диалогов...
                  </p>
                  <Button variant="link" className="p-0 h-auto gradient-primary bg-clip-text text-transparent">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Отзывы клиентов
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Что говорят те, кто уже работал со мной
            </p>
            <div className="grid gap-6">
              {customerReviews.map((review, index) => (
                <Card key={review.id} className="animate-slide-up hover-scale" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 gradient-primary text-white">
                          <AvatarFallback className="bg-transparent font-semibold">
                            {review.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{review.author}</CardTitle>
                          <CardDescription>{review.date}</CardDescription>
                        </div>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Card className="p-8 gradient-primary text-white">
                <h3 className="text-2xl font-bold mb-4">Средняя оценка</h3>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-5xl font-bold">4.8</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={28}
                        className="fill-white text-white"
                      />
                    ))}
                  </div>
                </div>
                <p className="opacity-90">На основе {customerReviews.length} отзывов</p>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Контакты
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Свяжитесь со мной удобным способом
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6 hover-scale">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@codeko.dev</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-scale">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Telegram</h3>
                    <p className="text-muted-foreground">@codeko_dev</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-scale">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (900) 123-45-67</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-scale">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Globe" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">GitHub</h3>
                    <p className="text-muted-foreground">github.com/codeko</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Форма обратной связи</h3>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя</label>
                  <Input 
                    placeholder="Иван Иванов" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email" 
                    placeholder="ivan@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Тема</label>
                  <Input 
                    placeholder="Создание Telegram-бота" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea 
                    placeholder="Расскажите о вашем проекте..." 
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full gradient-primary text-white font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </form>
            </Card>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Часто задаваемые вопросы
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Ответы на популярные вопросы о создании ботов
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Сколько времени занимает разработка бота?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Сроки зависят от сложности проекта. Простой чат-бот можно создать за 3-5 дней, 
                  более сложные системы с интеграциями займут 7-14 дней. После обсуждения задачи 
                  я предоставлю точные сроки именно для вашего проекта.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Какие платформы вы поддерживаете?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Я разрабатываю ботов для Telegram, WhatsApp, веб-сайтов, Discord и других популярных 
                  платформ. Также возможна кроссплатформенная разработка, когда один бот работает 
                  сразу на нескольких платформах.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Нужно ли мне разбираться в программировании?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Нет, абсолютно не нужно! Я беру на себя всю техническую часть. От вас требуется 
                  только описание задачи и желаемого функционала. После создания бота я предоставлю 
                  понятную инструкцию по использованию.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Предоставляете ли вы поддержку после запуска?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Да! В стоимость разработки входит месяц бесплатной технической поддержки. 
                  Я помогу с настройкой, исправлю возможные ошибки и отвечу на все вопросы. 
                  После этого возможна платная поддержка и доработка функционала.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Можно ли интегрировать бота с моей CRM или базой данных?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Конечно! Я специализируюсь на интеграциях с популярными CRM (AmoCRM, Bitrix24, 
                  HubSpot), платёжными системами, базами данных и API сторонних сервисов. 
                  Это позволяет автоматизировать ваши бизнес-процессы максимально эффективно.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Какие способы оплаты вы принимаете?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Принимаю оплату банковским переводом, на карту, через СБП, PayPal. 
                  Работаю по предоплате 50% для начала разработки, остаток после сдачи проекта. 
                  Для постоянных клиентов возможны индивидуальные условия.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Можно ли добавить новые функции после запуска бота?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Да, без проблем! Я пишу чистый и документированный код, поэтому боты легко 
                  масштабируются. Вы всегда можете заказать доработку и добавление нового функционала. 
                  Стоимость и сроки обсуждаем индивидуально в зависимости от объёма работ.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card className="mt-12 p-8 text-center gradient-primary text-white">
              <h3 className="text-2xl font-bold mb-3">Не нашли ответ на свой вопрос?</h3>
              <p className="mb-6 opacity-90">
                Напишите мне, и я с радостью отвечу на все ваши вопросы!
              </p>
              <Button size="lg" variant="secondary" className="font-semibold">
                Задать вопрос
                <Icon name="MessageCircle" size={20} className="ml-2" />
              </Button>
            </Card>
          </div>
        )}
      </main>

      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 gradient-primary rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50 animate-pulse"
        >
          <Icon name="MessageCircle" size={28} />
        </button>
      )}

      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border-2 border-primary/20 z-50 animate-fade-in">
          <div className="gradient-primary p-4 rounded-t-2xl flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} />
              </div>
              <div>
                <h3 className="font-bold">Поддержка Codeko</h3>
                <p className="text-xs opacity-90">Обычно отвечаем в течение часа</p>
              </div>
            </div>
            <button onClick={() => setShowChat(false)} className="hover:bg-white/20 rounded-lg p-2 transition-colors">
              <Icon name="X" size={20} />
            </button>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="bg-muted rounded-lg p-4 mb-4">
              <p className="text-sm">👋 Здравствуйте! Чем могу помочь?</p>
            </div>
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Напишите сообщение..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="gradient-primary text-white flex-shrink-0">
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </form>
        </div>
      )}

      <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Codeko</h3>
              <p className="text-purple-200">
                Профессиональная разработка ботов для вашего бизнеса
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Telegram-боты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp-боты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Чат-боты для сайтов</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Портфолио</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@codeko.dev
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  @codeko_dev
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-purple-700" />
          <div className="text-center text-purple-200">
            <p>&copy; 2024 Codeko. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;