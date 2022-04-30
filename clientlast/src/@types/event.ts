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
    location:{
        lat:number,
        long:number
    },
    description:string,
    status:string,
    comments:object[],
    eventDate:string,
    createdDate:string
}