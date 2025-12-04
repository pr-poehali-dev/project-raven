import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('home');

  const products: Product[] = [];

  const customerReviews: Review[] = [
    {
      id: 1,
      author: 'Анна Иванова',
      avatar: 'AI',
      rating: 5,
      date: '15 ноября 2024',
      comment: 'Отличный магазин! Быстрая доставка, качественные товары. Наушники превзошли все ожидания!'
    },
    {
      id: 2,
      author: 'Михаил Петров',
      avatar: 'МП',
      rating: 5,
      date: '10 ноября 2024',
      comment: 'Заказывал умные часы - пришли через 2 дня. Упаковка супер, всё оригинальное. Рекомендую!'
    },
    {
      id: 3,
      author: 'Елена Сидорова',
      avatar: 'ЕС',
      rating: 4,
      date: '5 ноября 2024',
      comment: 'Хороший выбор косметики. Цены адекватные. Одна звезда минус за задержку с доставкой.'
    },
    {
      id: 4,
      author: 'Дмитрий Смирнов',
      avatar: 'ДС',
      rating: 5,
      date: '1 ноября 2024',
      comment: 'Покупаю здесь уже третий раз. Всегда всё на высоте - от ассортимента до обслуживания!'
    },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name={star <= rating ? "Star" : "Star"}
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
                <Icon name="ShoppingBag" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Codeko
              </h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="font-medium"
              >
                Главная
              </Button>
              <Button
                variant={activeTab === 'reviews' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('reviews')}
                className="font-medium"
              >
                Отзывы
              </Button>
              <Button
                variant={activeTab === 'about' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('about')}
                className="font-medium"
              >
                О нас
              </Button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center gradient-accent border-0">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${cart.length}`}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                        {getTotalPrice().toLocaleString()} ₽
                      </span>
                    </div>
                    <Button className="w-full gradient-primary text-white font-semibold py-6">
                      Оформить заказ
                      <Icon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <section className="mb-16 text-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Стиль и качество
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Откройте мир премиальных товаров с доставкой по всей России
              </p>
            </section>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="electronics">Техника</TabsTrigger>
                <TabsTrigger value="accessories">Аксессуары</TabsTrigger>
                <TabsTrigger value="beauty">Красота</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover-scale animate-slide-up border-2 hover:border-primary/50 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="relative overflow-hidden group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className="absolute top-4 right-4 gradient-accent border-0">
                          {product.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          {renderStars(Math.floor(product.rating))}
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                          {product.price.toLocaleString()} ₽
                        </div>
                        <Button
                          onClick={() => addToCart(product)}
                          className="gradient-primary text-white font-semibold"
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="electronics">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === 'Электроника').map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover-scale animate-slide-up border-2 hover:border-primary/50 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="relative overflow-hidden group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className="absolute top-4 right-4 gradient-accent border-0">
                          {product.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          {renderStars(Math.floor(product.rating))}
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                          {product.price.toLocaleString()} ₽
                        </div>
                        <Button
                          onClick={() => addToCart(product)}
                          className="gradient-primary text-white font-semibold"
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="accessories">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === 'Аксессуары').map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover-scale animate-slide-up border-2 hover:border-primary/50 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="relative overflow-hidden group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className="absolute top-4 right-4 gradient-accent border-0">
                          {product.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          {renderStars(Math.floor(product.rating))}
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                          {product.price.toLocaleString()} ₽
                        </div>
                        <Button
                          onClick={() => addToCart(product)}
                          className="gradient-primary text-white font-semibold"
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="beauty">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === 'Красота').map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover-scale animate-slide-up border-2 hover:border-primary/50 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="relative overflow-hidden group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className="absolute top-4 right-4 gradient-accent border-0">
                          {product.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          {renderStars(Math.floor(product.rating))}
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </CardHeader>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                          {product.price.toLocaleString()} ₽
                        </div>
                        <Button
                          onClick={() => addToCart(product)}
                          className="gradient-primary text-white font-semibold"
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Отзывы покупателей
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Что говорят наши клиенты о Codeko
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
                <h3 className="text-2xl font-bold mb-4">Средняя оценка магазина</h3>
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

        {activeTab === 'about' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              О нашем магазине
            </h2>
            <Card className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Codeko — это современная платформа для онлайн-покупок, где стиль встречается с качеством.
                  Мы тщательно отбираем каждый товар, чтобы предложить вам только лучшее.
                </p>
                
                <Separator className="my-8" />
                
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <Card className="p-6 text-center hover-scale border-2 border-primary/20">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Truck" size={32} className="text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Быстрая доставка</h3>
                    <p className="text-muted-foreground">
                      Доставка по России от 1 до 3 дней
                    </p>
                  </Card>
                  
                  <Card className="p-6 text-center hover-scale border-2 border-secondary/20">
                    <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Shield" size={32} className="text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Гарантия качества</h3>
                    <p className="text-muted-foreground">
                      100% оригинальные товары
                    </p>
                  </Card>
                  
                  <Card className="p-6 text-center hover-scale border-2 border-accent/20">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Headphones" size={32} className="text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Поддержка 24/7</h3>
                    <p className="text-muted-foreground">
                      Всегда готовы помочь
                    </p>
                  </Card>
                </div>
                
                <Separator className="my-8" />
                
                <h3 className="text-2xl font-bold mb-4">Наша миссия</h3>
                <p className="text-muted-foreground mb-6">
                  Мы создаем пространство, где покупки становятся удовольствием. Каждый товар в нашем каталоге
                  проходит строгий контроль качества, чтобы вы получали только то, что действительно заслуживает
                  вашего внимания.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">Почему выбирают нас?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={24} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Широкий ассортимент товаров от проверенных брендов</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={24} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Удобная система оплаты и безопасные транзакции</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={24} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Программа лояльности и регулярные акции</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="CheckCircle" size={24} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Простой возврат товара в течение 14 дней</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 text-white mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Codeko</h3>
              <p className="text-purple-200">
                Ваш надежный партнер в мире онлайн-шопинга
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Вакансии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Помощь</h4>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-purple-200">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@shopvibe.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  8 (800) 555-35-35
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-purple-700" />
          <div className="text-center text-purple-200">
            <p>&copy; 2024 ShopVibe. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;