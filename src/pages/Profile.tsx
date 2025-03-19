
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserCog, LogOut } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFirebase } from '@/contexts/FirebaseContext';

const Profile = () => {
  const navigate = useNavigate();
  const { auth } = useFirebase();
  
  // Mock user data - in a real app, this would come from Firebase auth
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    photoURL: '',
    joinDate: 'January 2023',
  };

  const handleLogout = async () => {
    try {
      // Implementation would use Firebase auth signOut
      console.log('Logging out...');
      // Navigate to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="glass-morphism rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="w-24 h-24 border-2 border-white/20">
              <AvatarImage src={user.photoURL} />
              <AvatarFallback className="bg-primary/20 text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">{user.name}</h1>
              <p className="text-white/70">{user.email}</p>
              <p className="text-white/50 text-sm mt-1">Member since {user.joinDate}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Settings */}
          <Card className="col-span-1 bg-black/40 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={18} />
                Account
              </CardTitle>
              <CardDescription className="text-white/60">
                Manage your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <UserCog className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
          
          {/* Activity */}
          <Card className="col-span-1 md:col-span-2 bg-black/40 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription className="text-white/60">
                Your recent property views and searches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <p className="font-medium">Viewed Property</p>
                  <p className="text-white/70 text-sm">Luxury Villa in Los Angeles</p>
                  <p className="text-white/50 text-xs mt-1">2 days ago</p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <p className="font-medium">Saved to Favorites</p>
                  <p className="text-white/70 text-sm">Modern Apartment in New York</p>
                  <p className="text-white/50 text-xs mt-1">1 week ago</p>
                </div>
                <div>
                  <p className="font-medium">Property Search</p>
                  <p className="text-white/70 text-sm">Properties in Miami, FL</p>
                  <p className="text-white/50 text-xs mt-1">2 weeks ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
