import NewMettupForm from '../../components/meetups/NewMeetupForm';


const NewMeetup =  ()=> {
    const addMeetupHandler = async(meetupData) => {

        const res = await fetch('/api/new-meetup',{
            method:'POST',
            body: JSON.stringify(meetupData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        console.log(data)
    }

    return <NewMettupForm onAddMeetup={addMeetupHandler}></NewMettupForm>;
}

export default NewMeetup;

