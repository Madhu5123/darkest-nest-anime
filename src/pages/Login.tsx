
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  LogIn, 
  Lock, 
  Mail, 
  User,
  Github,
  Twitter
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate API login
    setTimeout(() => {
      // This is just for demo purposes
      // In a real app, you would verify with a backend
      if (email === 'demo@example.com' && password === 'password') {
        // Success, would normally set auth tokens, etc.
        window.location.href = '/properties';
      } else {
        setError('Invalid email or password. Try demo@example.com / password');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Login Form */}
            <div className="glass-morphism rounded-xl p-8 animate-fade-in">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Welcome Back</h1>
                <p className="text-white/70 mt-1">Sign in to your LuxEstate account</p>
              </div>
              
              {error && (
                <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin}>
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
              
              <div className="relative flex items-center justify-center mt-6 mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative px-4 bg-black/30 text-sm text-white/50">
                  or continue with
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
              
              <p className="text-center mt-6 text-sm text-white/70">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
            
            {/* Demo Info */}
            <div className="mt-6 glass-morphism rounded-xl p-4 text-center text-sm text-white/70 animate-fade-in animation-delay-100">
              <p>For demo purposes, use <b>demo@example.com</b> with password <b>password</b></p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
