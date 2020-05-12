import React, { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserForm = () => {
    const [isLogin, setLogin] = useState(false);
    const [isRegistration, setRegistration] = useState(false);
    const stut = (name) => {
        console.log(name);
        if (name !== name) {
            setLogin(true);
        }
        else {
            setRegistration(true);
        }
    }
    const [value, setValue] = useState('Select a forum');
    return (
        <div className="UserForm" >
            <div className="mine">
                <div>
                    <Dropdown>
                        <Dropdown.Toggle>
                            {value}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {['codingStudio', 'stumagz', 'IEEE-Vbit', 'RoboticsClub'].map(
                                (club) => (
                                    <Dropdown.Item onSelect={() => setValue(club)}>{club}</Dropdown.Item>
                                )
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div style={{ marginTop: 20 }}></div>
                <Button type="submit" onClick={() => { stut(value) }}> Submit </Button>

                {isLogin && <Link to={'/register'} style={{ display: 'block', marginTop: 20 }}>Register </Link>}

                {isRegistration && <Link to={'/login'} style={{ display: 'block', marginTop: 20 }}>Login </Link>}
            </div>
        </div >
    );
}

export default UserForm;
