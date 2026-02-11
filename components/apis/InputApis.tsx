import React, { useState } from 'react';
import { ApiProps } from '../../types';
import { ApiShell } from '../ApiShell';
import { Search, MapPin } from 'lucide-react';

// --- Shared Input Helper ---
const SearchInput = ({ value, onChange, placeholder, onSearch, loading }: any) => (
  <div className="flex gap-2 max-w-md mx-auto md:mx-0 w-full">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      placeholder={placeholder}
      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
    <button
      onClick={onSearch}
      disabled={loading || !value.trim()}
      className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors flex items-center gap-2"
    >
      <Search size={18} />
      <span className="hidden sm:inline">Search</span>
    </button>
  </div>
);

// --- Agify (Age Prediction) ---
export const AgifyApi: React.FC<ApiProps> = ({ definition }) => {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ age: number; count: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`https://api.agify.io?name=${name}`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      if (data.age === null) throw new Error('No data found for this name');
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiShell 
      definition={definition} 
      loading={loading} 
      error={error}
      controls={<SearchInput value={name} onChange={setName} placeholder="Enter a first name..." onSearch={handleSearch} loading={loading} />}
    >
      {result ? (
        <div className="flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95">
          <div className="text-6xl font-bold text-slate-800 mb-2">{result.age}</div>
          <div className="text-xl text-slate-500 uppercase tracking-wide font-medium">Predicted Age</div>
          <div className="mt-6 text-sm text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            Based on {result.count.toLocaleString()} records
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-400 py-12">Enter a name above to predict the age.</div>
      )}
    </ApiShell>
  );
};

// --- Genderize (Gender Prediction) ---
export const GenderizeApi: React.FC<ApiProps> = ({ definition }) => {
  const [name, setName] = useState('');
  const [result, setResult] = useState<{ gender: string; probability: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`https://api.genderize.io?name=${name}`);
      const data = await res.json();
      if (data.gender === null) throw new Error('No prediction available');
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiShell 
      definition={definition} 
      loading={loading} 
      error={error}
      controls={<SearchInput value={name} onChange={setName} placeholder="Enter a first name..." onSearch={handleSearch} loading={loading} />}
    >
      {result ? (
        <div className="flex flex-col items-center justify-center p-8">
           <div className={`
              text-5xl font-bold capitalize mb-4 px-8 py-4 rounded-xl shadow-sm border
              ${result.gender === 'male' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-pink-50 text-pink-600 border-pink-100'}
           `}>
             {result.gender}
           </div>
           <div className="w-64 bg-slate-100 rounded-full h-4 overflow-hidden mt-4">
              <div 
                className={`h-full ${result.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'}`} 
                style={{ width: `${result.probability * 100}%` }}
              ></div>
           </div>
           <div className="mt-2 text-sm text-slate-500">
             {Math.round(result.probability * 100)}% Probability
           </div>
        </div>
      ) : (
        <div className="text-center text-slate-400 py-12">Enter a name to predict gender.</div>
      )}
    </ApiShell>
  );
};

// --- Zippopotamus (US Zip) ---
export const ZipCodeApi: React.FC<ApiProps> = ({ definition }) => {
  const [zip, setZip] = useState('90210');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!zip.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // Restricting to US for simplicity as per requirement to keep it simple but functional
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!res.ok) throw new Error('Invalid Zip Code or Not Found');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError('Could not find zip code information. Ensure it is a valid US Zip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiShell 
      definition={definition} 
      loading={loading} 
      error={error}
      controls={<SearchInput value={zip} onChange={setZip} placeholder="Enter US Zip (e.g. 10001)" onSearch={handleSearch} loading={loading} />}
    >
      {data ? (
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{data['post code']}</h3>
                <p className="text-sm text-slate-500">{data.country}</p>
              </div>
           </div>
           
           <div className="space-y-3">
             {data.places.map((place: any, idx: number) => (
               <div key={idx} className="bg-white p-4 rounded border border-slate-200 shadow-sm">
                 <div className="font-semibold text-slate-900">{place['place name']}</div>
                 <div className="text-sm text-slate-600 flex justify-between mt-1">
                    <span>State: {place['state']} ({place['state abbreviation']})</span>
                 </div>
                 <div className="text-xs text-slate-400 mt-2 font-mono">
                    Lat: {place.latitude} | Lon: {place.longitude}
                 </div>
               </div>
             ))}
           </div>
        </div>
      ) : (
        <div className="text-center text-slate-400 py-12">Enter a US Zip code to find location details.</div>
      )}
    </ApiShell>
  );
};