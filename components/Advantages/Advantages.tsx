import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import CheckLogo from './check.svg';
 
export const Advantages = ({ adventeges }:AdvantagesProps):JSX.Element => {
    return (
        <>
            {adventeges.map(a => (
                    <div  key={a._id} className={styles.advantage}>
                        <CheckLogo/>
                        <div className={styles.title}>{a.title}</div>
                        <hr className={styles.vline}/>
                        <div>{a.description}</div>
                    </div>
            ))}   
        </>
    );
};
