import { MyLog } from '../../Components'
import classes from './SingleNetwork.module.css'

const logs = [
    {date:'04:17:39', mssg:'This is Apollo/Saturn Launch Control. Were in a built-in hold at T-minus 3 hours, 30 minutes, and holding. We expect to resume our countdown at about 48 minutes from this time at 6:02am, Eastern Daylight Time. All elements of the Apollo 11 countdown are GO at this time. Were heading for a planned liftoff on the Apollo 11 mission at 9:32am Eastern Daylight. The prime crew for Apollo 11 is Neil Armstrong, Michael Collins, and Edwin Aldrin. Were awakended ... just about an hour ago, at 4:15am, Eastern Daylight. At this time, after successfully completing a ... determination, theyre sitting down for breakfast. The breakfast menu, the usual astronaut fare on launch'},
    {date:'02:46:00', mssg:'This is Apollo/Saturn Launch Control. T-minus 2 hours, 45 minutes, 55 seconds and counting. As the prime crew for the mission, astronauts Neil Armstrong, Michael Collins, and Edwin Aldrin are on the ... part of their trip to the launch pad in the transfer van--its now making the curve toward the pad, we have discovered a problem at the launch pad itself as the crew is about to arrive. We have a leak in a valve located in a system associated with replenishing liquid hydrogen for the third stage of the Saturn V launch vehicle. This is a piece of ground support equipment, actually.'},
    {date:'04:17:39', mssg:'This is Apollo/Saturn Launch Control. Were in a built-in hold at T-minus 3 hours, 30 minutes, and holding. We expect to resume our countdown at about 48 minutes from this time at 6:02am, Eastern Daylight Time. All elements of the Apollo 11 countdown are GO at this time. Were heading for a planned liftoff on the Apollo 11 mission at 9:32am Eastern Daylight. The prime crew for Apollo 11 is Neil Armstrong, Michael Collins, and Edwin Aldrin. Were awakended ... just about an hour ago, at 4:15am, Eastern Daylight. At this time, after successfully completing a ... determination, theyre sitting down for breakfast. The breakfast menu, the usual astronaut fare on launch'},
    {date:'02:46:00', mssg:'This is Apollo/Saturn Launch Control. T-minus 2 hours, 45 minutes, 55 seconds and counting. As the prime crew for the mission, astronauts Neil Armstrong, Michael Collins, and Edwin Aldrin are on the ... part of their trip to the launch pad in the transfer van--its now making the curve toward the pad, we have discovered a problem at the launch pad itself as the crew is about to arrive. We have a leak in a valve located in a system associated with replenishing liquid hydrogen for the third stage of the Saturn V launch vehicle. This is a piece of ground support equipment, actually.'},
    {date:'04:17:39', mssg:'This is Apollo/Saturn Launch Control. Were in a built-in hold at T-minus 3 hours, 30 minutes, and holding. We expect to resume our countdown at about 48 minutes from this time at 6:02am, Eastern Daylight Time. All elements of the Apollo 11 countdown are GO at this time. Were heading for a planned liftoff on the Apollo 11 mission at 9:32am Eastern Daylight. The prime crew for Apollo 11 is Neil Armstrong, Michael Collins, and Edwin Aldrin. Were awakended ... just about an hour ago, at 4:15am, Eastern Daylight. At this time, after successfully completing a ... determination, theyre sitting down for breakfast. The breakfast menu, the usual astronaut fare on launch'},
    {date:'02:46:00', mssg:'This is Apollo/Saturn Launch Control. T-minus 2 hours, 45 minutes, 55 seconds and counting. As the prime crew for the mission, astronauts Neil Armstrong, Michael Collins, and Edwin Aldrin are on the ... part of their trip to the launch pad in the transfer van--its now making the curve toward the pad, we have discovered a problem at the launch pad itself as the crew is about to arrive. We have a leak in a valve located in a system associated with replenishing liquid hydrogen for the third stage of the Saturn V launch vehicle. This is a piece of ground support equipment, actually.'}
]

const members = [
    'Ganesha Ji',
    'Ganesha Ji',
    'Ganesha Ji',
    'Tanisha Bisht',
    'Prakhar Kaushik',
    'Arnav Roy',
    'Tanisha Bisht',
    'Prakhar Kaushik'
]

const output = 'This is Apollo/Saturn Launch Control. Were in a built-in hold at T-minus 3 hours, 30 minutes, and holding. We expect to resume our countdown at about 48 minutes from this time at 6:02am, Eastern Daylight Time. All elements of the Apollo 11 countdown are GO at this time. Were heading for a planned liftoff on the Apollo 11 mission at 9:32am Eastern Daylight. The prime crew for Apollo 11 is Neil Armstrong, Michael Collins, and Edwin Aldrin. Were awakended ... just about an hour ago, at 4:15am'


const MyLogs = () => {


    return (
        <div className={classes.Container}>

            <div className={classes.FirstContainer}>
                <div className={classes.LogsContainer}>
                    {logs.map(e => <MyLog date={e.date} mssg={e.mssg} />)}
                </div>
                <input type="text" name="type" className={classes.Input} style={{width:'20%'}} placeholder='Type' />
                <input type="text" name="text" className={classes.Input} style={{width:'80%'}} placeholder='Enter your log' />
            </div>


            <div className={classes.SecondContainer}>
                <div className={classes.MembersContainer}>
                    <h2>NETWORK MEMBERS</h2>
                    <div className={classes.MemberList}>
                        {members.map(e => <p>{e}</p>)}
                    </div>
                </div>
                <div className={classes.OutputContainer}>
                    <h2>Output</h2>
                    <p>{output}</p>
                </div>
            </div>
           
        </div>
    );
}

export default MyLogs;