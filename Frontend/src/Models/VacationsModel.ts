export default class Vacation {
    vacationId: number;
    destination: string;
    description: string;
    start: string;
    end: string;
    price: number;
    image: string;

    constructor(vacation: { vacationId: number, destination: string, description: string, start: string, end: string, price: number, image: string }) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start = new Date(vacation.start).toISOString().slice(0, 10);
        this.end = new Date(vacation.end).toISOString().slice(0, 10);
        this.price = vacation.price;
        this.image = vacation.image.startsWith("http") ? vacation.image : "http://localhost:4000/images/" + vacation.image;
    }

    public static destinationValidation = {
        required: { value: true, message: "Destination is required" },
        minLength: { value: 2, message: "Destination must be at least 2 characters" },
        maxLength: { value: 20, message: "Destination cannot exceed 20 characters" }
    }

    public static descriptionValidation = {
        required: { value: true, message: "Description is required" },
        minLength: { value: 2, message: "Description must be at least 2 characters" },
        maxLength: { value: 500, message: "Description cannot exceed 500 characters" }
    }

    public static startValidation = {
        required: { value: true, message: "Start date is required" },
        min: { value: Date(), message: "Start date must be after today" }
    }

    public static endValidation = {
        required: { value: true, message: "End date is required" },
    }

    public static priceValidation = {
        required: { value: true, message: "Price is required" },
        min: { value: 1000, message: "Price must be at least 1000" },
        max: { value: 10000, message: "Price cannot exceed 10000" }
    }

    public static imageValidation = {
        required: { value: true, message: "Image is required" },
    }
}