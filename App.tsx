import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ApiDefinition } from './types';
import { 
  Cat, Dog, Smile, Lightbulb, 
  User, Users, Globe, 
  MapPin 
} from 'lucide-react';

// Import API Components
import { CatFactsApi, DogImageApi, JokeApi, AdviceApi, IpApi } from './components/apis/SimpleApis';
import { AgifyApi, GenderizeApi, ZipCodeApi } from './components/apis/InputApis';

// Define the APIs
const API_LIST: ApiDefinition[] = [
  { id: 'cat', title: 'Cat Facts', description: 'Random facts about cats.', icon: Cat, category: 'Entertainment' },
  { id: 'dog', title: 'Dog Images', description: 'Random adorable dog photos.', icon: Dog, category: 'Entertainment' },
  { id: 'joke', title: 'Official Jokes', description: 'Random programming and general jokes.', icon: Smile, category: 'Entertainment' },
  { id: 'advice', title: 'Advice Slip', description: 'Daily wisdom and life advice.', icon: Lightbulb, category: 'Entertainment' },
  { id: 'agify', title: 'Agify', description: 'Predict age based on a name.', icon: User, category: 'Data' },
  { id: 'genderize', title: 'Genderize', description: 'Predict gender based on a name.', icon: Users, category: 'Data' },
  { id: 'ip', title: 'IP Address', description: 'Get your current public IP address.', icon: Globe, category: 'Utility' },
  { id: 'zip', title: 'Zippopotamus', description: 'US Zip code lookup and location info.', icon: MapPin, category: 'Utility' },
];

const App: React.FC = () => {
  const [selectedApiId, setSelectedApiId] = useState<string>(API_LIST[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedApi = API_LIST.find(api => api.id === selectedApiId) || API_LIST[0];

  const renderContent = () => {
    switch (selectedApiId) {
      case 'cat': return <CatFactsApi definition={selectedApi} />;
      case 'dog': return <DogImageApi definition={selectedApi} />;
      case 'joke': return <JokeApi definition={selectedApi} />;
      case 'advice': return <AdviceApi definition={selectedApi} />;
      case 'ip': return <IpApi definition={selectedApi} />;
      case 'agify': return <AgifyApi definition={selectedApi} />;
      case 'genderize': return <GenderizeApi definition={selectedApi} />;
      case 'zip': return <ZipCodeApi definition={selectedApi} />;
      default: return <div>Select an API</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          apis={API_LIST} 
          selectedApiId={selectedApiId} 
          onSelect={(id) => {
            setSelectedApiId(id);
            setIsMobileMenuOpen(false);
          }} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm z-30">
          <span className="font-bold text-slate-800">API Nexus</span>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
           <div className="max-w-5xl mx-auto">
             {renderContent()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;