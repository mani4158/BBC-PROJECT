export interface Invoice {
            id: number;
        startDate: string;
        endDate: string;
        totalAmount: number;
        dueDate: string;
        payDate?: string;
        discount?: number;
        final_Amount:any;
        amountStatus: boolean; 
        customerId: any;
        "customer": {
            name:any;
            custId:any;
            dueDate:Date;
            endDate:Date;
            startDate:Date;
        }
      }
      

