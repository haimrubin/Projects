package components;

/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <br>This class represents a record in the package transfer history. 
 *
 *<p>fields:
 *<br>time - value of the system clock as soon as the record is created (integer)
 *<br>Node- Package location @Node
 *<br>Status - Package status @Status
 */

public class Tracking{
	public final int time;
	public final Node node;
	public final Status status;

	
	public Tracking(int time, Node node, Status status) {
		super();
		this.time = time;
		this.node = node;
		this.status = status;
	}

	
	@Override
	public String toString() {
		String name = (node==null)? "Customer" : node.getName();
		return time + ": " + name + ", status=" + status;
	}

	
	
}
