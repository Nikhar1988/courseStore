import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import GlassIcon from './glass.svg';
import cn from 'classnames';
import { Button, Input } from '..';
import { useState } from 'react';
import { useRouter } from 'next/router';



export const Search = ({ className, ...props}:SearchProps):JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const goToSearch =() => {
        router.push({
            pathname:'/search',
            query: {
                q:search
            }
        });
    };

    const handleKeyDown = (e:KeyboardEvent) => {
        if(e.key == 'Enter') {
            goToSearch();
        }
    };

    return (
        <div className={cn(styles.search, className )} {...props}>
            <Input 
            className={styles.input}
                placeholder='Поиск...'
                onChange={(e)=> setSearch(e.target.value)}
                value={search}
                onKeyDown={handleKeyDown}
            />
            <Button
                appearance='primary'
                className={styles.button}
                onClick={goToSearch}
            >
                <GlassIcon/>
            </Button>
        </div>

    );
};
