package components;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <br>This Class represents packages with varying weights over one kilogram.
 *<br>extends from @Package
 *
 */

public class StandardPackage extends Package {
	
	private double weight;
	
	
	public StandardPackage(Priority priority, Address senderAddress, Address destinationAdress,double weight) {
		super( priority, senderAddress,destinationAdress);
		this.weight=weight;
		System.out.println("Creating " + this);
	}

	
	public double getWeight() {
		return weight;
	}

	
	public void setWeight(double weight) {
		this.weight = weight;
	}

	
	@Override
	public String toString() {
		return "StandardPackage ["+ super.toString()+", weight=" + weight + "]";
	}
}
