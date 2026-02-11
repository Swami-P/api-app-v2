import React, { useState, useEffect, useCallback } from 'react';
import { ApiProps } from '../../types';
import { ApiShell } from '../ApiShell';

// --- Cat Facts ---
export const CatFactsApi: React.FC<ApiProps> = ({ definition }) => {
  const [state, setState] = useState<{ fact: string; length: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://catfact.ninja/fact');
      if (!res.ok) throw new Error('Failed to fetch fact');
      const data = await res.json();
      setState(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <ApiShell definition={definition} loading={loading} error={error} onRefresh={fetchData}>
      {state && (
        <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
          <blockquote className="text-2xl font-serif italic text-slate-700 leading-relaxed">
            "{state.fact}"
          </blockquote>
          <div className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
            Length: {state.length} chars
          </div>
        </div>
      )}
    </ApiShell>
  );
};

// --- Dog Images ---
export const DogImageApi: React.FC<ApiProps> = ({ definition }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!res.ok) throw new Error('Failed to fetch dog image');
      const data = await res.json();
      setImageUrl(data.message);
    } catch (err) {
      setError('Could not load a dog image.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <ApiShell definition={definition} loading={loading} error={error} onRefresh={fetchData}>
      <div className="flex justify-center items-center min-h-[300px]">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Random Dog" 
            className="max-h-[400px] w-auto object-contain rounded-lg shadow-md border border-slate-200"
          />
        ) : (
          <div className="h-64 w-64 bg-slate-100 rounded-lg animate-pulse" />
        )}
      </div>
    </ApiShell>
  );
};

// --- Jokes ---
export const JokeApi: React.FC<ApiProps> = ({ definition }) => {
  const [joke, setJoke] = useState<{ setup: string; punchline: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setShowPunchline(false);
    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!res.ok) throw new Error('Failed to fetch joke');
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError('Failed to load joke service.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <ApiShell definition={definition} loading={loading} error={error} onRefresh={fetchData}>
      {joke && (
        <div className="max-w-lg mx-auto p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
          <p className="text-xl font-medium text-slate-800 mb-6">{joke.setup}</p>
          
          {showPunchline ? (
             <p className="text-2xl font-bold text-blue-600 animate-in zoom-in spin-in-1">
               {joke.punchline}
             </p>
          ) : (
            <button 
              onClick={() => setShowPunchline(true)}
              className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-full transition-colors"
            >
              Show Punchline
            </button>
          )}
        </div>
      )}
    </ApiShell>
  );
};

// --- IP Address ---
export const IpApi: React.FC<ApiProps> = ({ definition }) => {
  const [ipData, setIpData] = useState<{ ip: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      if (!res.ok) throw new Error('Failed to fetch IP');
      const data = await res.json();
      setIpData(data);
    } catch (err) {
      setError('Could not retrieve IP address.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <ApiShell definition={definition} loading={loading} error={error} onRefresh={fetchData}>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-sm uppercase tracking-widest text-slate-500 font-semibold mb-2">Your Public IP Address</div>
        {ipData ? (
          <div className="text-5xl font-mono text-slate-800 tracking-tight">{ipData.ip}</div>
        ) : (
           <div className="h-12 w-64 bg-slate-100 animate-pulse rounded"></div>
        )}
        <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200 max-w-md text-center">
          Note: This is your public-facing IP address as seen by external servers.
        </div>
      </div>
    </ApiShell>
  );
};

// --- Advice Slip ---
export const AdviceApi: React.FC<ApiProps> = ({ definition }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Cache buster needed for this API sometimes
      const res = await fetch(`https://api.adviceslip.com/advice?t=${Date.now()}`);
      if (!res.ok) throw new Error('Failed to fetch advice');
      const data = await res.json();
      setAdvice(data.slip.advice);
    } catch (err) {
      setError('Advice service unavailable.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <ApiShell definition={definition} loading={loading} error={error} onRefresh={fetchData}>
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <div className="mb-6 h-1 w-20 bg-blue-500 rounded-full opacity-50"></div>
        {advice ? (
          <p className="text-3xl font-light text-slate-900 leading-snug">
            {advice}
          </p>
        ) : (
           <div className="space-y-3 w-full max-w-lg">
             <div className="h-4 bg-slate-100 rounded w-full"></div>
             <div className="h-4 bg-slate-100 rounded w-3/4 mx-auto"></div>
           </div>
        )}
        <div className="mt-6 h-1 w-20 bg-blue-500 rounded-full opacity-50"></div>
      </div>
    </ApiShell>
  );
};
