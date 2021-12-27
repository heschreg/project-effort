export interface BewerberDokuData {
  name:string;
  url: string;
  type: string;
  size: number;
  duration?: number;
  calories?: number;
  date?: Date;
  state?: 'completed'  | 'cancelled' | null;
}

/* Ressource.java
  private String name;
	private String url;
	private String type;
	private long size;
*/
