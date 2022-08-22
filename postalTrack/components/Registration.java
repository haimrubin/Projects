package components;


/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 */

public class Registration {
	private static int numTracking = 1;
	private int counter;
	Package pack;
	public Registration(Package p) {
		pack = p;
		counter = numTracking++;
	}
	
	public int getCounter() {
		return counter;
	}
	
	public int getIdPack() {
		return pack.getPackageID();
	}
	
	public String getStatusPack() {
		return pack.getStatusString();
	}
	
	public Address getSender() {
		return pack.getSenderAddress();
	}
	
	
	@Override
	public String toString() {
		return "    "+ counter + "   ) " + "pack ID: " + pack.getPackageID() + ", " + "Status: " + pack.getStatus() + ", " + "Sender: " + pack.getSenderAddress();
	}
	
}
