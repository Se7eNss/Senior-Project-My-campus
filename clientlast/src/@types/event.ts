export type EventState = {
    isLoading: boolean;
    error: Error | string | null;
    open: boolean;
    events: Eve[];
    event: Eve | null;
}


export type Eve = {
    title:string,
    location:{
        lat:number,
        long:number
    },
    description:string,
    comments:object[],
    eventDate:string,
    createdDate:string
}