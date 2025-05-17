import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { MapPin, Calendar as CalendarIcon, UserPlus, ShoppingCart, List } from 'lucide-react';

export default function HomePage() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [store, setStore] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: '', price: '' }]);
  const [helpers, setHelpers] = useState([
    { name: 'Alex', rating: 4.9, phone: '555-1234', available: true },
    { name: 'Jamie', rating: 4.7, phone: '555-5678', available: false },
    { name: 'Taylor', rating: 4.8, phone: '555-8765', available: true }
  ]);
  const [showAuth, setShowAuth] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setShowAuth(false);
    }
  }, []);

  const handleAuth = async () => {
    const endpoint = isSignup ? '/api/users/signup' : '/api/users/login';
    const body = isSignup ? { name, email, password } : { email, password };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setShowAuth(false);
    } else {
      alert(data.error || 'Authentication failed');
    }
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', price: '' }]);
  };

  const calculateTotal = () => {
    const itemTotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      return sum + price;
    }, 0);
    const deliveryFee = 5.0;
    const helperFee = 10.0;
    return itemTotal + deliveryFee + helperFee;
  };

  if (showAuth) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Need help with groceries? Get a helper now.</h1>
        <p className="text-lg text-center mb-6 text-gray-600">Sign in to find a trusted helper near you and make your shopping easy.</p>
        <h2 className="text-2xl font-semibold mb-4 text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup && (
          <Input className="mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <Input className="mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input className="mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleAuth}>{isSignup ? 'Sign Up' : 'Login'}</Button>
        <p className="mt-2 text-sm text-center">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button className="text-blue-600 underline ml-1" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Get a helper now</h1>
      <p className="text-lg mb-6">Need help with your grocery trip? Book a helper nearby to shop with you or for you.</p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
        <div>
          <label className="flex items-center gap-2 mb-2 font-medium"><MapPin size={18}/>Location</label>
          <Input
            placeholder="Enter your city or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="flex items-center gap-2 mb-2 font-medium"><CalendarIcon size={18}/>Date</label>
          <Calendar selected={date} onSelect={setDate} />
        </div>
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 mb-2 font-medium"><ShoppingCart size={18}/>Preferred Grocery Store</label>
          <Input
            placeholder="e.g. Walmart, Trader Joe's, Whole Foods"
            value={store}
            onChange={(e) => setStore(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><List size={20}/>Shopping List</h2>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-2">
            <Input
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
            />
            <Input
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', e.target.value)}
            />
            <div>
              <Input
                placeholder="Estimated Price"
                value={item.price}
                onChange={(e) => updateItem(index, 'price', e.target.value)}
              />
              {index === 0 && (
                <div className="text-sm mt-1">
                  Delivery: $5.00<br />Helper: $10.00<br />
                  <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                </div>
              )}
            </div>
          </div>
        ))}
        <Button onClick={addItem} variant="outline">+ Add Item</Button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Available Helpers</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {helpers.filter(h => h.available).map(helper => (
          <Card key={helper.name} className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{helper.name}</h3>
                  <p className="text-sm text-gray-600">Rating: {helper.rating}</p>
                  <p className="text-sm text-gray-600">
                    Phone: <a href={`tel:${helper.phone}`} className="text-blue-600 underline">{helper.phone}</a>
                  </p>
                </div>
                <Button><UserPlus className="mr-2" size={16}/> Book</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
