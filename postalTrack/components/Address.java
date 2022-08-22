package components;

import java.io.Serializable;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <br>This class represents the address of the sender or recipient of a package
 * <p>fields:
 * <br> @param zip-The branch to which the address belongs (integer)
 * <br> @param street - Street number (integer) - 6 digits
 *
 */

public class Address implements Serializable{
	private static final long serialVersionUID = 1L;
	public final int zip;
	public final int street;
	
	public Address(int zip, int street ) {
		this.zip=zip;
		this.street=street;
	}

	public int getZip() {
		return zip;
	}

	public int getStreet() {
		return street;
	}
	
	@Override
	public String toString() {
		return zip + "-" + street;
	}	

}
