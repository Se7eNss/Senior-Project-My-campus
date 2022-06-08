export type EventState = {
    isLoading: boolean;
    error: Error | string | null;
    open: boolean;
    events: Eve[];
    event: Eve | null;
}


export type Eve = {
    _id: string;
    title:string,
    user:{
        _id:string,
    }
    location:{
        lat:number,
        long:number
    },
    description:string,
    status:string,
    eventImage:{
        url:string
    },
    comments:object[],
    eventDate:string,
    eventEndDate:string,
    createdDate:string
}