import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import MyProblemCard from '../components/MyProblemCard';
const ViewMyProblems = () => {
    const { user } = useAuthContext();
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState([]);
    const [resolved, setResolved] = useState([]);
    const [unseen, setUnseen] = useState([]);
    const [tab, setTab] = useState(2);
    console.log(user)

    useEffect(() => {
        const fetchProblems = async () => {
        if (user.Type === 'Instructor') {
            const response = await fetch('/api/instructor/getMyProblems', {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json.error)
            if (response.ok) {
                setProblems(json)
                setPending([])
                setResolved([])
                setUnseen([])
                for (let i = 0; i < json.length; i++) {
                    if (json[i].Status === 'pending') {
                        setPending(pending => [...pending, json[i]])
                    }
                    if (json[i].Status === 'resolved') {
                        setResolved(resolved => [...resolved, json[i]])
                    }
                    if (json[i].Status === 'unseen') {
                        setUnseen(unseen => [...unseen, json[i]])
                    }
                }
            }
            if (!response.ok) {
                setError(json.error)
            }
            setLoading(false)
        }
        else if (user.Type === 'Trainee') {
            const response = await fetch('/api/trainee/page/getMyProblems', {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setProblems(json)
                setPending([])
                setResolved([])
                setUnseen([])
                for (let i = 0; i < json.length; i++) {
                    if (json[i].Status === 'pending') {
                        setPending(pending => [...pending, json[i]])
                    }
                    if (json[i].Status === 'resolved') {
                        setResolved(resolved => [...resolved, json[i]])
                    }
                    if (json[i].Status === 'unseen') {
                        setUnseen(unseen => [...unseen, json[i]])
                    }
                }
            }
            if (!response.ok) {
                setError(json.error)
            }
            setLoading(false)
        }
        else if (user.Type === 'Corporate') {
            const response = await fetch('/api/corpTrainee/page/getMyProblems', {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (response.ok) {
                setProblems(json)
                setPending([])
                setResolved([])
                setUnseen([])
                for (let i = 0; i < json.length; i++) {
                    if (json[i].Status === 'pending') {
                        setPending(pending => [...pending, json[i]])
                    }
                    if (json[i].Status === 'resolved') {
                        setResolved(resolved => [...resolved, json[i]])
                    }
                    if (json[i].Status === 'unseen') {
                        setUnseen(unseen => [...unseen, json[i]])
                    }
                }
            }
            if (!response.ok) {
                setError(json.error)
            }
            setLoading(false)
        }
        }
        setLoading(true)
        fetchProblems()
    }, [user,tab])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100%' }}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={tab}>
            <Tab label="Pending" onClick={() => setTab(0)} />
            <Tab label="Resolved" onClick={() => setTab(1)} />
            <Tab label="Unseen" onClick={() => setTab(2)} />
        </Tabs>
        </Box>
        <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {loading && <CircularProgress />}
            {tab === 0 && pending.length!==0 && pending.map(problem => (
                <MyProblemCard Problem={problem} />
            )) }
            {tab === 0 && pending.length===0 && !loading && <Typography variant="h6" sx={{color:'text.secondary'}}>No pending problems</Typography>}
            {tab === 1 && resolved.length!==0 && resolved.map(problem => (
                <MyProblemCard Problem={problem} />
            )) }
            {tab === 1 && resolved.length===0 && !loading && <Typography variant="h6" sx={{color:'text.secondary'}}>No resolved problems</Typography>}
            {tab === 2 && unseen.length!==0 && unseen.map(problem => (
                <MyProblemCard Problem={problem} />
            )) }
            {tab === 2 && unseen.length===0 && !loading && <Typography variant="h6" sx={{color:'text.secondary'}}>No unseen problems</Typography>}
        </Box>
        </Box>
    )



}
export default ViewMyProblems