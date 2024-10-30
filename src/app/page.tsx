/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Printer, QuoteIcon } from "lucide-react";

const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Define types
type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Cart = {
  [key: number]: number;
};

const initialBalance = 106000000000; // Bill Gates' estimated net worth as of 2023

const items: Item[] = [
  { id: 1, name: "iPhone 13 Pro", price: 999, image: "/iphone-13-pro.webp" },
  { id: 2, name: "Air Jordan 1 Retro High", price: 170, image: "/air-jordan-1.webp" },
  { id: 3, name: "PlayStation 5", price: 499, image: "/playstation-5.webp" },
  { id: 4, name: "Tesla Model S Plaid", price: 129990, image: "/tesla-model-s.webp" },
  { id: 5, name: "Rolex Daytona", price: 39350, image: "/rolex-daytona.webp" },
  { id: 6, name: "Macbook Pro 16-inch", price: 2499, image: "/macbook-pro.webp" },
  { id: 7, name: "Bose QuietComfort Earbuds", price: 279, image: "/bose-earbuds.webp" },
  { id: 8, name: "DJI Mavic 3 Drone", price: 2049, image: "/dji-mavic-3.webp" },
  { id: 9, name: "Peloton Bike+", price: 2495, image: "/peloton-bike.webp" },
  { id: 10, name: "Canon EOS R5 Camera", price: 3899, image: "/canon-eos-r5.webp" },
  { id: 11, name: "Luxury Yacht", price: 50000000, image: "/luxury-yacht.webp" },
  { id: 12, name: "Private Jet (Gulfstream G650)", price: 65000000, image: "/private-jet.webp" },
  { id: 13, name: "Manhattan Penthouse", price: 40000000, image: "/manhattan-penthouse.webp" },
  { id: 14, name: "Bugatti Chiron", price: 3000000, image: "/bugatti-chiron.webp" },
  { id: 15, name: "Private Island", price: 80000000, image: "/private-island.webp" },
  { id: 16, name: "Van Gogh Painting", price: 82500000, image: "/van-gogh-painting.webp" },
  { id: 17, name: "Super Bowl Ad (30 seconds)", price: 6500000, image: "/super-bowl-ad.webp" },
  { id: 18, name: "SpaceX Falcon 9 Launch", price: 62000000, image: "/spacex-falcon-9.webp" },
  { id: 19, name: "NFL Team", price: 3000000000, image: "/nfl-team.webp" },
  { id: 20, name: "Necker Island", price: 80000000, image: "/necker-island.webp" },
  { id: 21, name: "Diamond Necklace", price: 18500000, image: "/diamond-necklace.webp" },
  { id: 22, name: "Concert by Top Artist", price: 7000000, image: "/private-concert.webp" },
  { id: 23, name: "Submarine", price: 9000000, image: "/submarine.webp" },
  { id: 24, name: "Hollywood Movie Production", price: 200000000, image: "/movie-production.webp" },
  { id: 25, name: "Formula 1 Racing Team", price: 700000000, image: "/f1-racing-team.webp" },
  { id: 26, name: "Helicopter (Bell 429)", price: 7500000, image: "/helicopter.webp" },
  { id: 27, name: "Patek Philippe Watch", price: 2499, image: "/patek-philippe.webp" },
  { id: 28, name: "African Safari Lodge", price: 30000000, image: "/safari-lodge.webp" },
  { id: 29, name: "Superyacht with Helipad", price: 275000000, image: "/superyacht-helipad.webp" },
  { id: 30, name: "Private Museum", price: 500000000, image: "/private-museum.webp" },
  { id: 31, name: "Virgin Galactic Space Flight", price: 450000, image: "/virgin-galactic.webp" },
  { id: 32, name: "NBA Team", price: 2400000000, image: "/nba-team.webp" },
  { id: 33, name: "Maldives Resort", price: 100000000, image: "/maldives-resort.webp" },
  { id: 34, name: "Supercar Collection", price: 50000000, image: "/supercar-collection.webp" },
  { id: 35, name: "Michelin Star Restaurant", price: 2000000, image: "/michelin-restaurant.webp" },
  { id: 36, name: "Luxury Penthouse in Dubai", price: 49000000, image: "/dubai-penthouse.webp" },
  { id: 37, name: "Private Golf Course", price: 75000000, image: "/private-golf-course.webp" },
  { id: 38, name: "Cruise Ship", price: 950000000, image: "/cruise-ship.webp" },
  { id: 39, name: "Fashion Brand", price: 800000000, image: "/fashion-brand.webp" },
  { id: 40, name: "Rare Wine Collection", price: 25000000, image: "/rare-wine-collection.webp" },
  { id: 41, name: "University Building Donation", price: 100000000, image: "/private-university.webp" },
  { id: 42, name: "Five-Star Hotel Chain", price: 2000000000, image: "/hotel-chain.webp" },
  { id: 43, name: "Private Airport", price: 150000000, image: "/private-airport.webp" },
  { id: 44, name: "Ski Resort", price: 180000000, image: "/ski-resort.webp" },
  { id: 45, name: "Tech Startup Investment", price: 500000000, image: "/tech-startup.webp" },
  { id: 46, name: "Luxury Train (Orient Express)", price: 240000000, image: "/luxury-train.webp" },
  { id: 47, name: "Rare Book Collection", price: 40000000, image: "/rare-books.webp" },
  { id: 48, name: "Worldwide Charity Campaign", price: 1000000000, image: "/charity-campaign.webp" },
  { id: 49, name: "Space Tourism Company", price: 1500000000, image: "/space-tourism.webp" },
  { id: 50, name: "Artificial Island", price: 2000000000, image: "/artificial-island.webp" },
];

const quotes: string[] =  [
  "With Bill Gates' net worth, you could give every person on Earth about $13.",
  "Bill Gates earns around $1,250 per second - that's $75,000 per minute!",
  "If Bill Gates was a country, his wealth would rank him as the 57th richest country in the world.",
  "Bill Gates could buy 131 million Xbox Series X consoles at retail price.",
  "Bill Gates' wealth could pay off the student loan debt of over 2.5 million Americans.",
  "If you had Bill Gates' net worth in $100 bills, the stack would be over 67 miles high!",
  "Bill Gates could buy Instagram twice over with his current net worth.",
  "With Bill Gates' fortune, you could buy a $400,000 house every hour for over 30 years.",
  "Bill Gates' net worth is more than the combined GDP of Iceland, Nicaragua, and Cambodia.",
  "If Bill Gates spent a million dollars every day, it would take him over 290 years to spend all his money.",
];

type NetWorthCardProps = {
  balance: number;
  initialBalance: number;
  onViewReceipt: () => void;
};

const NetWorthCard: React.FC<NetWorthCardProps> = ({ balance, initialBalance, onViewReceipt }) => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white p-4 shadow-lg rounded-lg">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-2">
          <span className="text-2xl mr-2">💰</span>
          <span className="text-2xl font-bold">Remaining Fortune: </span>
        </div>
        <span className="text-3xl font-bold">{formatMoney(balance)}</span>
        {initialBalance - balance > 0 && (
          <div className="mt-2 text-sm bg-white bg-opacity-20 p-2 rounded-md">
            <span className="mr-2">📝</span>
            <p>You've spent: {((initialBalance - balance) / initialBalance * 100).toFixed(4)}% of total</p>
            <button 
              onClick={onViewReceipt}
              className="ml-2 bg-white text-blue-500 px-2 py-1 rounded-full hover:bg-blue-100 focus:outline-none transition duration-300"
            >
              View receipt 📝
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SpendBillGatesMoneyDeluxe() {
  const [balance, setBalance] = useState(initialBalance);
  const [cart, setCart] = useState<Cart>({});
  const [quote, setQuote] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const contentStart = contentRef.current?.offsetTop ?? 0;
      const contentEnd = contentStart + (contentRef.current?.offsetHeight ?? 0) - window.innerHeight;

      setShowStickyHeader(scrollPosition > contentStart && scrollPosition < contentEnd);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buyItem = (id: number, price: number) => {
    if (balance >= price) {
      setBalance(balance - price);
      setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
    }
  };

  const sellItem = (id: number, price: number) => {
    if (cart[id] && cart[id] > 0) {
      setBalance(balance + price);
      setCart({ ...cart, [id]: cart[id] - 1 });
    }
  };

  const printReceipt = () => {
    setShowReceipt(true);
  };

  const shareOnTwitter = () => {
    const spentAmount = initialBalance - balance;
    const tweetText = `I just spent ${formatMoney(spentAmount)} of Bill Gates' money! Can you spend it all? #SpendBillGatesMoney`;
    const url = 'https://spendbillgatesmoney.xyz/';
    const imageUrl = 'https://spendbillgatesmoney.xyz/spend-bill-gates-money.webp';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}&card_image=${encodeURIComponent(imageUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const spentAmount = initialBalance - balance;
    const url = 'https://spendbillgatesmoney.xyz/';
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`I just spent ${formatMoney(spentAmount)} of Bill Gates' money! Can you spend it all?`)}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Profile Image */}
          <div className="inline-block rounded-full overflow-hidden border-4 border-blue-500 mb-4">
            <div className="w-32 h-32 relative">
              <Image
                src="/spend-bill-gates-money.webp"
                alt="Spend Bill Gates' Money"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-2">
            Spend Bill Gates' Money
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-4">
            As of {getCurrentDate()}, Forbes reports Bill Gates' net worth at $
            {(initialBalance / 1e9).toFixed(1)} billion (US Dollars).
          </p>
          <p className="text-xl text-gray-600">
            "Experience the thrill of spending Bill's massive fortune!"
          </p>

          {/* Source Link */}
          <p className="text-sm text-gray-500 mt-2">
            Source:{' '}
            <Link
              href="https://www.forbes.com/real-time-billionaires/"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Forbes Real-Time Billionaires
            </Link>
          </p>
        </div>

        {/* Quote Section */}
        <Card className="bg-blue-100 mb-8 shadow-lg">
          <CardContent className="p-6 flex items-center">
            <QuoteIcon className="w-10 h-10 mr-4 text-blue-500 flex-shrink-0" />
            <p className="text-2xl font-semibold text-gray-800 italic">{quote}</p>
          </CardContent>
        </Card>

        {/* Static NetWorthCard Below Quote */}
        <div className="w-full mb-4">
          <NetWorthCard
            balance={balance}
            initialBalance={initialBalance}
            onViewReceipt={() => setShowReceipt(true)}
          />
        </div>

        {/* Sticky NetWorthCard During Scroll */}
        <div
          className={`sticky top-0 z-10 transition-all duration-300 ease-in-out ${
            showStickyHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <NetWorthCard
            balance={balance}
            initialBalance={initialBalance}
            onViewReceipt={() => setShowReceipt(true)}
          />
        </div>

        {/* Main Content */}
        <div ref={contentRef}>
          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {items.map((item) => (
              <Card key={item.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <div className="h-48 mb-4 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{item.name}</h3>
                  <p className="text-2xl font-bold text-center mb-4">{formatMoney(item.price)}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      onClick={() => sellItem(item.id, item.price)}
                      disabled={!cart[item.id]}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      SELL
                    </Button>
                    <input
                      type="number"
                      value={cart[item.id] || 0}
                      readOnly
                      className="w-16 text-center border border-gray-300 rounded"
                    />
                    <Button
                      onClick={() => buyItem(item.id, item.price)}
                      disabled={balance < item.price}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      BUY
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Cart */}
          <Card className="bg-white shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Your Cart</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Name</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(cart).map(([id, quantity]) => {
                    const item = items.find((i) => i.id === parseInt(id));
                    if (item && quantity > 0) {
                      return (
                        <TableRow key={id}>
                          <TableCell className="text-left">{item.name}</TableCell>
                          <TableCell className="text-right">{quantity}</TableCell>
                          <TableCell className="text-right">{formatMoney(quantity * item.price)}</TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4">
              <p className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
                Total Spent: {formatMoney(initialBalance - balance)}
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  onClick={printReceipt}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
                >
                  <Printer className="mr-2 h-5 w-5" /> Print Receipt
                </Button>
                <Button
                  onClick={shareOnTwitter}
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                >
                  Share on Twitter (X)
                </Button>
                <Button
                  onClick={shareOnFacebook}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Share on Facebook
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Receipt Modal */}
        {showReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Receipt</h2>
              <table className="w-full mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Item</th>
                    <th className="text-center py-2 px-4 font-semibold text-gray-700">Quantity</th>
                    <th className="text-right py-2 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-right py-2 px-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cart).map(([id, quantity]) => {
                    const item = items.find((i) => i.id === parseInt(id));
                    if (item && quantity > 0) {
                      return (
                        <tr key={id} className="border-b border-gray-200">
                          <td className="py-2 px-4 text-gray-800">{item.name}</td>
                          <td className="py-2 px-4 text-center text-gray-800">{quantity}</td>
                          <td className="py-2 px-4 text-right text-gray-800">{formatMoney(item.price)}</td>
                          <td className="py-2 px-4 text-right text-gray-800">{formatMoney(quantity * item.price)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td colSpan={3} className="py-2 px-4 text-right font-bold text-gray-800">Total Spent:</td>
                    <td className="py-2 px-4 text-right font-bold text-gray-800">{formatMoney(initialBalance - balance)}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td colSpan={3} className="py-2 px-4 text-right font-bold text-blue-800">Remaining Balance:</td>
                    <td className="py-2 px-4 text-right font-bold text-blue-800">{formatMoney(balance)}</td>
                  </tr>
                </tfoot>
              </table>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowReceipt(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="bg-blue-50 text-gray-800 mt-12 rounded-lg shadow-lg">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h2 className="text-4xl font-extrabold mb-8 text-blue-800 text-center">
              About "Spend Bill Gates' Money"
            </h2>
            
            <section className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-blue-700">
                Embark on a Billionaire's Shopping Spree
              </h3>
              <p className="text-lg mb-4 leading-relaxed">
                Welcome to <Link href="https://spendbillgatesmoney.xyz" className="text-blue-600 hover:underline font-semibold">
                "Spend Bill Gates' Money"
                </Link>, an exhilarating virtual experience that puts you in control of one of the world's largest fortunes. 
                Have you ever wondered what it would be like to have billions at your fingertips? Now's your chance to find out!
              </p>
              <p className="text-lg mb-4 leading-relaxed">
                Our innovative wealth simulator allows you to step into the shoes of tech mogul Bill Gates and unleash your 
                wildest spending fantasies. With a fortune that would take lifetimes to exhaust in reality, you're challenged 
                to spend every last dollar in our virtual marketplace. From everyday luxuries to world-changing investments, 
                the possibilities are as vast as the fortune itself.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-blue-700">
                How to Spend Bill Gates' Money: Your Guide to Billions
              </h3>
              <ol className="list-decimal list-inside space-y-4">
                <li className="text-lg">
                  <span className="font-semibold">Enter the Billionaire's Bazaar:</span> As soon as you start, you'll find yourself 
                  in a digital shopping paradise with Bill Gates' entire fortune at your disposal.
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Explore Extravagant Options:</span> Browse through an extensive catalog of items, 
                  from cutting-edge tech to humanitarian projects, each with a detailed description and price tag.
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Make Impactful Decisions:</span> Will you invest in space exploration, fund global 
                  healthcare initiatives, or indulge in a fleet of superyachts? The choice is yours!
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Watch Your Wealth:</span> Keep an eye on the real-time balance as you shop. Can you 
                  strategize to spend every last dollar?
                </li>
                <li className="text-lg">
                  <span className="font-semibold">Review Your Legacy:</span> Once you've exhausted the fortune (or whenever you choose), 
                  hit "Print Receipt" to see a summary of your billionaire spending spree.
                </li>
              </ol>
            </section>

            <section className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-blue-700">
                Why "Spend Bill Gates' Money" is More Than Just a Game
              </h3>
              <p className="text-lg mb-4 leading-relaxed">
                While the premise might seem playful, "Spend Bill Gates' Money" offers a unique lens through which to view 
                wealth, economy, and global issues. As you navigate through the spending options, you'll gain perspective on:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li className="text-lg">The true scale of billion-dollar fortunes</li>
                <li className="text-lg">The potential impact of strategic philanthropy</li>
                <li className="text-lg">The balance between personal luxury and global change</li>
                <li className="text-lg">The complexities of managing and allocating vast resources</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-blue-700">
                Features That Make "Spend Bill Gates' Money" Unique
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2 text-blue-600">Diverse Spending Options</h4>
                  <p>From $2 pizza slices to $1 billion skyscrapers, experience the full spectrum of spending possibilities.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2 text-blue-600">Real-time Balance Updates</h4>
                  <p>Watch in awe as billions dwindle with each purchase, providing a tangible sense of wealth's scale.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2 text-blue-600">Educational Insights</h4>
                  <p>Gain fascinating facts about wealth distribution, global economics, and the cost of world-changing projects.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2 text-blue-600">Strategic Challenges</h4>
                  <p>Try to balance personal indulgences with philanthropic endeavors. Can you spend it all responsibly?</p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-blue-700">
                Intriguing Facts: The Reality of Bill Gates' Wealth
              </h3>
              <ul className="list-disc list-inside space-y-3 ml-6">
                <li className="text-lg">
                  If Bill Gates spent $1 million daily, it would take over 290 years to deplete his fortune.
                </li>
                <li className="text-lg">
                  Bill Gates' net worth surpasses the GDP of many countries, highlighting the immense scale of his wealth.
                </li>
                <li className="text-lg">
                  The Bill & Melinda Gates Foundation, funded largely by Gates' wealth, has donated over $50 billion to global causes since its inception.
                </li>
                <li className="text-lg">
                  Despite his massive donations, Gates' wealth continues to grow due to smart investments and the power of compound interest.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-blue-700">
                The Impact of Playing "Spend Bill Gates' Money"
              </h3>
              <p className="text-lg mb-4 leading-relaxed">
                By engaging with our "Spend Bill Gates' Money" simulator, you're not just playing a game – you're gaining 
                valuable insights into the nature of extreme wealth and its potential applications. This experience can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-6">
                <li className="text-lg">Enhance your understanding of large-scale financial decisions</li>
                <li className="text-lg">Spark discussions about wealth distribution and social responsibility</li>
                <li className="text-lg">Inspire creative thinking about solving global challenges</li>
                <li className="text-lg">Provide a fun, interactive way to explore economic concepts</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-blue-700">Ready to Spend Bill Gates' Money?</h3>
              <p className="text-lg mb-4 leading-relaxed">
                Now that you understand the ins and outs of our wealth simulator, are you ready to take on the challenge? 
                Remember, spending billions responsibly is harder than it looks! Will you focus on personal luxuries, 
                invest in world-changing technologies, or find a balance between the two?
              </p>
              <p className="text-lg mb-4 leading-relaxed">
                Start your journey into the world of billion-dollar decisions. Who knows? You might 
                just learn something about yourself – and the world – along the way.
              </p>
              <div className="text-center">
                <Button 
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
                  className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-blue-700 transition duration-300"
                >
                  Start Spending Now!
                </Button>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-12 rounded-lg">
  <div className="container mx-auto px-4 text-center">
    <p className="mb-2 text-lg">Created with passion by H</p>
    <nav className="flex justify-center items-center gap-4 mb-4">
      <Link 
        href="/disclaimer" 
        className="text-blue-300 hover:underline"
      >
        Disclaimer
      </Link>
      <span className="text-gray-500">|</span>
      <Link 
        href="https://www.spendelonmuskmoney.org/" 
        className="text-blue-300 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Spend Elon Musk Money
      </Link>
    </nav>
    <p className="mt-4 text-sm">
      "Spend Bill Gates' Money" is a simulation game for entertainment and educational purposes only. 
      It is not affiliated with Bill Gates or any of his enterprises.
    </p>
  </div>
</footer>
      </div>
    </div>
  );
}