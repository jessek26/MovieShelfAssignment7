import { createContext, useState, useContext, useEffect } from 'react';

const WatchListContext = createContext();

//custom hook for using context
export function useWatchList() { 
    const context = useContext(WatchListContext); 
    if(!context) {
        throw new Error('useWatchList must be used within WatchListProvider')
    }
    return context;
};

//creating provier component
export const WatchListProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(() => {
        const saved = localStorage.getItem('watchList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => { 
        localStorage.setItem('watchList', JSON.stringify(watchList)); 
      }, [watchList]);

    const addToWatchList = (movie) => {
        if(!watchList.some(m => m.id === movie.id)) {
            setWatchList(prev => [...prev, movie]);
        }
    };

    const removeFromWatchList = (movieId) => {
        setWatchList(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isInWatchList = (movieId) => {
        return watchList.some(movie => movie.id === movieId);
    };

    const value = {
        watchList,
        addToWatchList,
        removeFromWatchList,
        isInWatchList
    };
    
return (
    <WatchListContext.Provider value={value}>
        {children}
    </WatchListContext.Provider>
);

};